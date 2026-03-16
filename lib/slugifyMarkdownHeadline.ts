import slugify from 'slugify';

export default function slugifyMarkdownHeadline(
  markdownChildren: string | any[],
): string {
  const FRAGMENT_REGEX = /\[#(?<slug>(\w|-|_)*)\]/g;
  if (!markdownChildren) return '';

  const collectStrings = (node: any): string[] => {
    if (node == null) return [];
    if (typeof node === 'string') return [node];
    if (Array.isArray(node)) return node.flatMap(collectStrings);
    if (typeof node === 'object' && node.props && node.props.children)
      return collectStrings(node.props.children);
    return [];
  };

  const strings = collectStrings(markdownChildren);

  const metaSlug = strings
    .map((s) => {
      const fragment = FRAGMENT_REGEX.exec(s);
      return fragment?.groups?.slug || null;
    })
    .find(Boolean);

  if (metaSlug) return metaSlug;

  const joinedChildren = strings
    .map((string) => string.replace(FRAGMENT_REGEX, ''))
    .join(' ');
  return slugify(joinedChildren, { lower: true, trim: true });
}
