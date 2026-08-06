const PATHS = {
  search: <path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm10 2-4.35-4.35" />,
  sun: <path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-15v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" />,
  moon: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />,
  palette: <path d="M12 22a10 10 0 1 1 10-10c0 2.5-2 3-4 3h-1.5a2 2 0 0 0-1.5 3.3c.4.5.6 1 .4 1.5a1.6 1.6 0 0 1-1.4 1.2Zm0-12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm4 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM8 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />,
  menu: <path d="M4 7h16M4 12h16M4 17h10" />,
  close: <path d="M18 6 6 18M6 6l12 12" />,
  arrowRight: <path d="M5 12h14m-6-6 6 6-6 6" />,
  arrowLeft: <path d="M19 12H5m6 6-6-6 6-6" />,
  arrowUpRight: <path d="M7 17 17 7m0 0H8m9 0v9" />,
  download: <path d="M12 3v12m-5-5 5 5 5-5M4 19h16" />,
  upload: <path d="M12 15V3m5 5-5-5-5 5M4 19h16" />,
  check: <path d="m4 12.5 5 5L20 6.5" />,
  checkCircle: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-3.2-8.2 2.2 2.2 4.4-4.8" />,
  plus: <path d="M12 5v14m-7-7h14" />,
  trash: <path d="M4 7h16M9 7V4h6v3m-8 0 1 13h8l1-13M10 11v6m4-6v6" />,
  edit: <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z" />,
  shield: <path d="M12 3 5 6v5c0 4.5 3 8.5 7 10 4-1.5 7-5.5 7-10V6l-7-3Zm-3 9 2.2 2.2L15.6 9.4" />,
  lock: <path d="M6 11h12v9H6zM8 11V7a4 4 0 0 1 8 0v4" />,
  unlock: <path d="M6 11h12v9H6zM8 11V7a4 4 0 0 1 7.7-1.3M12 15v2" />,
  users: <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm13 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />,
  bell: <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M10.3 21a2 2 0 0 0 3.4 0" />,
  folder: <path d="M3 7a2 2 0 0 1 2-2h4l2 3h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />,
  file: <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Zm0 0v5h5M9 13h6m-6 4h4" />,
  fileText: <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Zm0 0v5h5M9 13h6m-6 4h4" />,
  video: <path d="m3 8 2 8a2 2 0 0 0 1.8 1.4h10.4A2 2 0 0 0 19 16l2-8M11 11l4 2-4 2v-4Z" />,
  play: <path d="m8 5 11 7-11 7V5Z" />,
  audio: <path d="M4 15v-2a8 8 0 0 1 16 0v2M4 15h3l1-2h2v5H8l-1-2H4a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1Zm0-2h2m14 2h-3l-1-2h-2v5h4l1-2h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1Z" />,
  image: <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM21 15l-4.5-4.5L7 20" />,
  folderPlus: <path d="M3 7a2 2 0 0 1 2-2h4l2 3h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Zm9 3v6m-3-3h6" />,
  mail: <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm0 2 8 6 8-6" />,
  home: <path d="m3 11 9-8 9 8M5 9.5V21h5v-6h4v6h5V9.5" />,
  layers: <path d="m12 3 9 5-9 5-9-5 9-5Zm-9 10 9 5 9-5M3 17l9 5 9-5" />,
  filter: <path d="M4 5h16l-6 7v6l-4 2v-8L4 5Z" />,
  redirect: <path d="M14 5h5v5m0-5-8 8m5-13H5v14h14V12" />,
  clock: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-14v6l4 2" />,
  refresh: <path d="M4 5v5h5M20 19v-5h-5M4 10a8 8 0 0 1 13.7-3M20 14a8 8 0 0 1-13.7 3" />,
  eye: <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />,
  send: <path d="m3 4 18 8-18 8 3-8-3-8Zm3 8h15" />,
  logout: <path d="M15 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4M11 8l-4 4 4 4m-4-4h11" />,
  grid: <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />,
  zap: <path d="M13 2 3 14h8l-1 8 11-13h-8l0-7Z" />,
  external: <path d="M14 5h5v5m0-5L9 15M19 19v2H3V5h2m14 14v-4" />,
  share: <path d="M12 3v13m-5-8 5-5 5 5M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />,
  code: <path d="m9 7-5 5 5 5m6-10 5 5-5 5" />,
}

export default function Icon({ name, size = 20, strokeWidth = 1.8, className, style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {PATHS[name] || null}
    </svg>
  )
}
