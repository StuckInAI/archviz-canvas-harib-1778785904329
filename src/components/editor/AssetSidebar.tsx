import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useEditorStore } from '@/hooks/useEditorStore';
import { ASSET_LIBRARY, AssetDefinition, CATEGORY_LABELS } from '@/lib/assets';
import { SceneObject, AssetCategory } from '@/types';

export default function AssetSidebar() {
  const [search, setSearch] = useState('');
  const [expandedCats, setExpandedCats] = useState<Set<string>>(new Set(['structural']));
  const addObject = useEditorStore((s) => s.addObject);
  const selectObject = useEditorStore((s) => s.selectObject);

  const categories = Object.keys(CATEGORY_LABELS) as AssetCategory[];

  function toggleCategory(cat: string) {
    setExpandedCats((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }

  function handleAddAsset(asset: AssetDefinition) {
    const obj: SceneObject = {
      id: uuidv4(),
      assetId: asset.id,
      name: asset.name,
      position: [0, asset.defaultScale[1] / 2, 0],
      rotation: [0, 0, 0],
      scale: [...asset.defaultScale],
      materialId: '',
      visible: true,
    };
    addObject(obj);
    selectObject(obj.id);
  }

  const filteredAssets = search.trim()
    ? ASSET_LIBRARY.filter((a) =>
        a.name.toLowerCase().includes(search.toLowerCase())
      )
    : null;

  return (
    <div style={{
      width: 240,
      background: '#25253a',
      borderRight: '1px solid #3d3d5c',
      overflowY: 'auto',
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ padding: '0.75rem', borderBottom: '1px solid #3d3d5c' }}>
        <h3 style={{ color: 'white', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 600 }}>Assets</h3>
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '0.35rem 0.5rem',
            background: '#3d3d5c',
            border: 'none',
            borderRadius: 4,
            color: 'white',
            fontSize: '0.8rem',
            outline: 'none',
          }}
        />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem' }}>
        {filteredAssets ? (
          filteredAssets.map((asset) => (
            <button
              key={asset.id}
              onClick={() => handleAddAsset(asset)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                width: '100%',
                padding: '0.5rem',
                background: 'transparent',
                color: '#e0e0e0',
                border: 'none',
                borderRadius: 4,
                fontSize: '0.8rem',
                cursor: 'pointer',
                textAlign: 'left',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#3d3d5c')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{ fontSize: '1.2rem' }}>{asset.icon}</span>
              <span>{asset.name}</span>
            </button>
          ))
        ) : (
          categories.map((cat) => {
            const catAssets = ASSET_LIBRARY.filter((a) => a.category === cat);
            const isExpanded = expandedCats.has(cat);
            return (
              <div key={cat} style={{ marginBottom: '0.25rem' }}>
                <button
                  onClick={() => toggleCategory(cat)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '0.4rem 0.5rem',
                    background: 'transparent',
                    color: '#aaa',
                    border: 'none',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  <span>{CATEGORY_LABELS[cat]}</span>
                  <span>{isExpanded ? '▼' : '▶'}</span>
                </button>
                {isExpanded && catAssets.map((asset) => (
                  <button
                    key={asset.id}
                    onClick={() => handleAddAsset(asset)}
                    title={asset.description}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      width: '100%',
                      padding: '0.4rem 0.5rem 0.4rem 1rem',
                      background: 'transparent',
                      color: '#e0e0e0',
                      border: 'none',
                      borderRadius: 4,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#3d3d5c')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <span style={{ fontSize: '1.1rem' }}>{asset.icon}</span>
                    <span>{asset.name}</span>
                  </button>
                ))}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
