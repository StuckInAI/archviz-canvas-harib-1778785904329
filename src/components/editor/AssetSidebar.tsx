import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useEditorStore } from '../../hooks/useEditorStore';
import { ASSET_LIBRARY, CATEGORY_LABELS, AssetDefinition } from '../../lib/assets';
import type { SceneObject } from '../../hooks/useEditorStore';

const categories = Object.keys(CATEGORY_LABELS);

export default function AssetSidebar() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [search, setSearch] = useState('');
  const addObject = useEditorStore((s) => s.addObject);

  const filteredAssets = ASSET_LIBRARY.filter((a) => {
    const matchesCat = a.category === activeCategory;
    const matchesSearch = search === '' || a.name.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

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
  }

  return (
    <div style={{
      width: 240,
      background: '#1a1a2e',
      borderRight: '1px solid #2d2d44',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      overflow: 'hidden',
    }}>
      <div style={{ padding: '10px 12px', borderBottom: '1px solid #2d2d44' }}>
        <h3 style={{ color: 'white', fontSize: '0.85rem', fontWeight: 600, marginBottom: 8 }}>Assets</h3>
        <input
          style={{
            width: '100%',
            padding: '6px 8px',
            background: '#16162a',
            border: '1px solid #2d2d44',
            borderRadius: 4,
            color: 'white',
            fontSize: '0.8rem',
            outline: 'none',
          }}
          placeholder="Search assets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Category tabs */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        padding: '8px 8px 4px',
        borderBottom: '1px solid #2d2d44',
      }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '4px 8px',
              borderRadius: 4,
              fontSize: '0.7rem',
              fontWeight: 500,
              color: activeCategory === cat ? 'white' : '#9ca3af',
              background: activeCategory === cat ? '#2563eb' : 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Asset list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 8 }}>
        {filteredAssets.length === 0 && (
          <p style={{ color: '#6b7280', fontSize: '0.8rem', textAlign: 'center', padding: '1rem' }}>
            No assets found
          </p>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {filteredAssets.map((asset) => (
            <button
              key={asset.id}
              onClick={() => handleAddAsset(asset)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 10px',
                background: '#16162a',
                border: '1px solid #2d2d44',
                borderRadius: 6,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'border-color 0.15s',
                color: 'white',
              }}
              onMouseOver={(e) => (e.currentTarget.style.borderColor = '#2563eb')}
              onMouseOut={(e) => (e.currentTarget.style.borderColor = '#2d2d44')}
            >
              <span style={{ fontSize: '1.3rem', width: 32, textAlign: 'center' }}>{asset.icon}</span>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 500 }}>{asset.name}</div>
                <div style={{ fontSize: '0.68rem', color: '#6b7280' }}>{asset.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
