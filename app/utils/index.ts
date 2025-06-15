export function handleDragStart(
  e: React.DragEvent,
  id: string,
  fromColumn: string
) {
  e.dataTransfer.setData(
    "text/plain",
    JSON.stringify({ itemId: id, fromColumn })
  );
}

export function handleDragOver(e: React.DragEvent) {
  e.preventDefault();
}
