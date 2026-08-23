import React from 'react';

const DataTable = ({ columns, data, emptyMessage = 'No records found' }) => {
  return (
    <div style={{ overflowX: 'auto', background: '#ffffff', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
        <thead>
          <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-color)' }}>
            {columns.map((col, idx) => (
              <th key={idx} style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase' }}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((row, rowIdx) => (
              <tr key={rowIdx} style={{ borderBottom: rowIdx === data.length - 1 ? 'none' : '1px solid var(--border-color)' }}>
                {columns.map((col, colIdx) => (
                  <td key={colIdx} style={{ padding: '0.85rem 1rem', color: 'var(--text-main)' }}>
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
