import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './MarkdownEditor.css';

const TOOLBAR = [
  { label: 'B', title: 'Bold', wrap: ['**', '**'] },
  { label: 'I', title: 'Italic', wrap: ['_', '_'] },
  { label: '~~', title: 'Strikethrough', wrap: ['~~', '~~'] },
  { label: 'H2', title: 'Heading 2', prefix: '## ' },
  { label: 'H3', title: 'Heading 3', prefix: '### ' },
  { label: '—', title: 'Divider', insert: '\n---\n' },
  { label: '• List', title: 'Bullet list', prefix: '- ' },
  { label: '1. List', title: 'Numbered list', prefix: '1. ' },
  { label: '`code`', title: 'Inline code', wrap: ['`', '`'] },
  { label: '```', title: 'Code block', wrap: ['```\n', '\n```'] },
  { label: '🔗', title: 'Link', snippet: '[text](url)' },
];

export default function MarkdownEditor({ value, onChange, placeholder }) {
  const [mode, setMode] = useState('split'); // 'edit' | 'split' | 'preview'

  function applyToolbar(item) {
    const ta = document.getElementById('md-textarea');
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = value.slice(start, end);
    let newVal = value;
    let cursor = start;

    if (item.wrap) {
      const [open, close] = item.wrap;
      newVal = value.slice(0, start) + open + selected + close + value.slice(end);
      cursor = start + open.length + selected.length + close.length;
    } else if (item.prefix) {
      const lineStart = value.lastIndexOf('\n', start - 1) + 1;
      newVal = value.slice(0, lineStart) + item.prefix + value.slice(lineStart);
      cursor = start + item.prefix.length;
    } else if (item.insert) {
      newVal = value.slice(0, start) + item.insert + value.slice(end);
      cursor = start + item.insert.length;
    } else if (item.snippet) {
      newVal = value.slice(0, start) + item.snippet + value.slice(end);
      cursor = start + item.snippet.length;
    }

    onChange({ target: { name: 'content', value: newVal } });
    setTimeout(() => { ta.focus(); ta.setSelectionRange(cursor, cursor); }, 0);
  }

  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
  const lineCount = value.split('\n').length;

  return (
    <div className="mde">
      {/* TOOLBAR */}
      <div className="mde__toolbar">
        <div className="mde__toolbar-actions">
          {TOOLBAR.map((item) => (
            <button
              key={item.label}
              type="button"
              title={item.title}
              className="mde__tb-btn"
              onClick={() => applyToolbar(item)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="mde__toolbar-modes">
          {['edit', 'split', 'preview'].map((m) => (
            <button
              key={m}
              type="button"
              className={`mde__mode-btn${mode === m ? ' active' : ''}`}
              onClick={() => setMode(m)}
            >
              {m === 'edit' ? '✏️ Editor' : m === 'split' ? '⊟ Split' : '👁 Preview'}
            </button>
          ))}
        </div>
      </div>

      {/* PANES */}
      <div className={`mde__panes mde__panes--${mode}`}>
        {(mode === 'edit' || mode === 'split') && (
          <div className="mde__pane mde__pane--editor">
            <textarea
              id="md-textarea"
              className="mde__textarea"
              value={value}
              onChange={onChange}
              name="content"
              placeholder={placeholder || '# Tiêu đề\n\nNội dung Markdown...'}
              spellCheck={false}
            />
          </div>
        )}

        {(mode === 'preview' || mode === 'split') && (
          <div className="mde__pane mde__pane--preview">
            {value.trim() ? (
              <div className="mde__preview-body">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
              </div>
            ) : (
              <div className="mde__preview-empty">Chưa có nội dung để xem trước...</div>
            )}
          </div>
        )}
      </div>

      {/* STATUS BAR */}
      <div className="mde__status">
        <span>{lineCount} dòng</span>
        <span>·</span>
        <span>{wordCount} từ</span>
        <span>·</span>
        <span>{value.length} ký tự</span>
        <span style={{ marginLeft: 'auto', color: 'var(--text-muted)' }}>Markdown</span>
      </div>
    </div>
  );
}
