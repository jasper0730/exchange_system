export function Table({ children, className = "", ...props }) {
  return (
    <table className={`min-w-full bg-white border border-gray-200 text-left ${className}`} {...props}>
      {children}
    </table>
  );
}
export function Thead({ children, className = "", ...props }) {
  return (
    <thead className={className} {...props}>
      {children}
    </thead>
  );
}
export function TheadTr({ children, className = "", ...props }) {
  return (
    <tr className={`bg-gray-900 text-white ${className}`} {...props}>
      {children}
    </tr>
  );
}
export function Th({ children, className = "", ...props }) {
  return (
    <th className={`px-4 py-2 ${className}`} {...props}>
      {children}
    </th>
  );
}
export function Tbody({ children, className = "", ...props }) {
  return (
    <tbody className={className} {...props}>
      {children}
    </tbody>
  );
}
export function TbodyTr({ children, className = "", ...props }) {
  return (
    <tr className={`hover:bg-gray-50 ${className}`} {...props}>
      {children}
    </tr>
  );
}
export function Td({ children, className = "", ...props }) {
  return (
    <th className={`px-4 py-2 ${className}`} {...props}>
      {children}
    </th>
  );
}

export default function CommonTable({ children, className = "" }) {
  return (
    <div className={`overflow-x-auto w-full ${className}`}>
      {children}
    </div>
  );
}

export function NoTableData({ text = "無資料可顯示", colSpan }) {
  return (
    <TbodyTr>
      <Td className={`text-center py-10 text-gray-500`} colSpan={colSpan}>{text}</Td>
    </TbodyTr>
  );
}