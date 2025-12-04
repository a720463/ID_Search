
import React from 'react';
import { Entry } from '../types';

interface EntryListItemProps {
  entry: Entry;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const EntryListItem: React.FC<EntryListItemProps> = ({ entry, onEdit, onDelete }) => {
  return (
    <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
      <td className="py-3 px-4 text-gray-800">{entry.lineName}</td>
      <td className="py-3 px-4 text-gray-800">{entry.gameId}</td>
      <td className="py-3 px-4 text-right">
        <button
          onClick={() => onEdit(entry.id)}
          className="mr-2 px-3 py-1 text-sm rounded-md font-medium text-white bg-blue-500 hover:bg-blue-600 transition duration-200"
        >
          編輯
        </button>
        <button
          onClick={() => onDelete(entry.id)}
          className="px-3 py-1 text-sm rounded-md font-medium text-white bg-red-500 hover:bg-red-600 transition duration-200"
        >
          刪除
        </button>
      </td>
    </tr>
  );
};

export default EntryListItem;