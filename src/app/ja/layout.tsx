export default function JaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div lang="ja">{children}</div>;
}
