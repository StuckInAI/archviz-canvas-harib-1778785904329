import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Search, ChevronDown, ChevronRight } from 'lucide-react';
import { ASSET_LIBRARY, CATEGORY_LABELS } from '@/lib/assets';
import { useEditorStore } from '@/hooks/useEditorStore';
import { AssetCategory, SceneObject } from '@/types';
import styles from './AssetSidebar.module.css';
import clsx from 'clsx';

export default function AssetSidebar() {
  const [search, setSearch] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['structural', 'furniture']));
  const { addObject, selectObject } = useEditorStore();

  const filteredAssets = ASSET_LIBRARY.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  const categories = Array.from(new Set(filteredAssets.map((a) => a.category)));

  function toggleCategory(cat: string) {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) {
        next.delete(cat);
      } else {
        next.add(cat);
      }
      return next;
    });
  }

  function handlePlace(assetId: string) {
    const asset = ASSET_LIBRARY.find((a) => a.id === assetId);
    if (!asset) return;
    const obj: SceneObject = {
      id: uuidv4(),
      assetId: asset.id,
      name: asset.name,
      position: [0, asset.defaultScale[1] / 2, 0],
      rotation: [0, 0, 0],
      scale: [...asset.defaultScale],
      materialId: 'concrete',
      visible: true,
    };
    addObject(obj);
    selectObject(obj.id);
  }

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <h3 className={styles.title}>Assets</h3>
      </div>
      <div className={styles.searchWrap}>
        <Search size={14} className={styles.searchIcon} />
        <input
          className={styles.searchInput}
          placeholder="Search assets..."
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        />
      </div>
      <div className={styles.list}>
        {categories.map((cat) => {
          const isExpanded = expandedCategories.has(cat);
          const items = filteredAssets.filter((a) => a.category === cat);
          return (
            <div key={cat} className={styles.catGroup}>
              <button
                className={styles.catHeader}
                onClick={() => toggleCategory(cat)}
              >
                {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                <span>{CATEGORY_LABELS[cat] || cat}</span>
                <span className={styles.catCount}>{items.length}</span>
              </button>
              {isExpanded && (
                <div className={styles.catItems}>
                  {items.map((asset) => (
                    <button
                      key={asset.id}
                      className={styles.assetItem}
                      onClick={() => handlePlace(asset.id)}
                      title={asset.description}
                    >
                      <span className={styles.assetIcon}>{asset.icon}</span>
                      <span className={styles.assetName}>{asset.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
