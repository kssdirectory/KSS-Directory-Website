// Not actually a hook. But still useful.

function isClientSide() {
    return !!(
        (typeof window !== 'undefined' &&
        window.document && window.document.createElement)
    );
}

export default isClientSide;