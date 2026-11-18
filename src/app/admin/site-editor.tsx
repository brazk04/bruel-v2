"use client";

import { upload } from "@vercel/blob/client";
import Image from "next/image";
import { useEffect, useState, type ChangeEvent } from "react";
import { mediaFormats, titleMaxLength, type ContentField, type ContentGroup } from "@/lib/cms/fields";
import type { SiteContent } from "@/lib/cms/schema";

type Snapshot = { content: SiteContent; revision: string | null };
type Notice = { text: string; error?: boolean };

export function SiteEditor({ groups, initial }: { groups: ContentGroup[]; initial: Snapshot }) {
  const [groupIndex, setGroupIndex] = useState(0);
  const [saved, setSaved] = useState(initial);
  const [draft, setDraft] = useState(initial.content);
  const [saving, setSaving] = useState(false);
  const [activeUpload, setActiveUpload] = useState<{ key: string; progress: number }>();
  const [notice, setNotice] = useState<Notice>();
  const dirty = [...new Set([...Object.keys(saved.content), ...Object.keys(draft)])]
    .some(key => saved.content[key] !== draft[key]);
  const busy = saving || Boolean(activeUpload);
  const group = groups[groupIndex];

  useEffect(() => {
    if (!dirty && !activeUpload) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty, activeUpload]);

  function change(field: ContentField, value: string) {
    setNotice(undefined);
    setDraft(current => {
      const next = { ...current };
      if (value === field.defaultValue) delete next[field.key];
      else next[field.key] = value;
      return next;
    });
  }

  async function uploadFile(event: ChangeEvent<HTMLInputElement>, field: ContentField) {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = "";
    if (!file || field.kind === "title" || busy) return;

    const format = mediaFormats[field.kind];
    const extension = Object.entries(format.types).find(([type]) => type === file.type)?.[1];
    if (!extension || !file.size || file.size > format.maxBytes) {
      setNotice({ text: `Selecione um arquivo no formato indicado. ${format.hint}.`, error: true });
      return;
    }

    setNotice(undefined);
    setActiveUpload({ key: field.key, progress: 0 });
    try {
      const blob = await upload(`bruel-media/${field.kind}/${crypto.randomUUID()}.${extension}`, file, {
        access: "public",
        handleUploadUrl: "/api/admin/upload",
        contentType: file.type,
        multipart: file.size > 8 * 1024 * 1024,
        onUploadProgress: ({ percentage }) => setActiveUpload({ key: field.key, progress: Math.round(percentage) }),
      });
      change(field, blob.url);
      setNotice({ text: "Arquivo enviado. Publique para exibi-lo no site." });
    } catch {
      setNotice({ text: "Falha no envio. Verifique sua conexão e sessão e tente novamente.", error: true });
    } finally {
      setActiveUpload(undefined);
    }
  }

  async function publish() {
    setNotice(undefined);
    const blank = groups.flatMap(item => item.fields).find(field =>
      field.kind === "title" && draft[field.key] !== undefined && !draft[field.key]?.trim());
    if (blank) {
      setGroupIndex(groups.findIndex(item => item.fields.includes(blank)));
      setNotice({ text: `Preencha o campo “${blank.label}”.`, error: true });
      return;
    }

    setSaving(true);
    try {
      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: draft, revision: saved.revision }),
      });
      if (!response.ok) {
        const result = await response.json();
        setNotice({ text: result.message, error: true });
        return;
      }
      const result: Snapshot = await response.json();
      setSaved(result);
      setDraft(result.content);
      setNotice({ text: "Alterações publicadas no site." });
    } catch {
      setNotice({ text: "Falha ao publicar. Tente novamente.", error: true });
    } finally {
      setSaving(false);
    }
  }

  return <>
    <div className="admin-publish">
      <div>
        <span>{dirty ? "Alterações pendentes" : "Tudo salvo"}</span>
        <p className={notice?.error ? "admin-error" : undefined} role={notice?.error ? "alert" : "status"}>
          {activeUpload ? `Enviando arquivo… ${activeUpload.progress}%` : notice?.text}
        </p>
      </div>
      <button className="admin-primary" type="button" disabled={!dirty || busy} onClick={publish}>
        {saving ? "Publicando…" : "Salvar e publicar"}
      </button>
    </div>
    <div className="admin-grid">
      <div className="admin-menu">
        <label htmlFor="admin-section">Seção do site</label>
        <select id="admin-section" value={groupIndex} onChange={event => setGroupIndex(Number(event.target.value))}>
          {groups.map((item, index) => <option key={item.title} value={index}>{item.title}</option>)}
        </select>
        <nav aria-label="Seções do site">
          {groups.map((item, index) => <button key={item.title} type="button" aria-current={index === groupIndex ? "true" : undefined}
            onClick={() => setGroupIndex(index)}>{item.title}</button>)}
        </nav>
      </div>
      <div className="admin-fields" aria-labelledby="admin-section-title">
        <h2 id="admin-section-title">{group.title}</h2>
        <div className="admin-field-list">
          {group.fields.map(field => {
            const value = draft[field.key] ?? field.defaultValue;
            const id = `admin-field-${field.key}`;
            return <div key={field.key} className="admin-field">
              <label htmlFor={id}>{field.label}</label>
              {field.kind === "title"
                ? <textarea id={id} maxLength={titleMaxLength} rows={2} value={value} disabled={saving}
                    onChange={event => change(field, event.target.value)} />
                : <>
                    {value && (field.kind === "image"
                      ? <Image className="admin-preview" src={value} alt={field.label} width={280} height={170} unoptimized />
                      : <video className="admin-preview" src={value} controls playsInline preload="none" aria-label={field.label} />)}
                    <p className="admin-format" id={`${id}-format`}>{mediaFormats[field.kind].hint}</p>
                    <input id={id} type="file" aria-describedby={`${id}-format`} accept={Object.keys(mediaFormats[field.kind].types).join(",")}
                      onChange={event => void uploadFile(event, field)} disabled={busy} />
                  </>}
              {value !== field.defaultValue && <button className="admin-reset" type="button" disabled={busy}
                onClick={() => change(field, field.defaultValue)}>Restaurar original</button>}
            </div>;
          })}
        </div>
      </div>
    </div>
  </>;
}
