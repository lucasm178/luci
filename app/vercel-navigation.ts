import { useEffect, useMemo, useState } from 'react';

function currentPath() {
  return window.location.pathname || '/';
}

export function usePathname() {
  const [pathname, setPathname] = useState(currentPath);

  useEffect(() => {
    const update = () => setPathname(currentPath());
    window.addEventListener('popstate', update);
    return () => window.removeEventListener('popstate', update);
  }, []);

  return pathname;
}

export function useRouter() {
  return useMemo(
    () => ({
      push(href: string) {
        window.history.pushState(null, '', href);
        window.dispatchEvent(new PopStateEvent('popstate'));
      },
      replace(href: string) {
        window.history.replaceState(null, '', href);
        window.dispatchEvent(new PopStateEvent('popstate'));
      },
      back() {
        window.history.back();
      },
    }),
    [],
  );
}
