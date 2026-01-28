import DOMPurify from "isomorphic-dompurify";

const ALLOWED_TAGS_LIST = ['a', 'p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'code']
const ALLOWED_ATTR_LIST = ['href', 'title', 'target', 'rel', 'style']
const FORBID_TAGS_LIST = ['style', 'script', 'iframe']
const FORBID_ATTR_LIST = ['onerror', 'onclick', 'onload']

export const sanitizeHTML = (dirty: string) => {
    const clean = DOMPurify.sanitize(dirty, {
        ALLOWED_TAGS: ALLOWED_TAGS_LIST,
        ALLOWED_ATTR: ALLOWED_ATTR_LIST,
        FORBID_TAGS: FORBID_TAGS_LIST,
        FORBID_ATTR: FORBID_ATTR_LIST,
    })

    return clean
}