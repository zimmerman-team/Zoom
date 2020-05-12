// forms the tiles nav link path
export function formPath(tab, owner, id, chartType) {
  if (tab === "charts" && owner) return `/visualizer/${chartType}/${id}/edit`;

  if (tab === "data-sets" && owner) return `/dataset/${id}`;

  return `/public/${chartType}/${id}/preview`;
}
