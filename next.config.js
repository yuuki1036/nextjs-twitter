/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // react-loader-spinner 8 を外部モジュールのまま SSR で読むと、ビルドの page data 収集で styled-components の呼び出しが「is not a function」で落ちるため、バンドルに含める
  transpilePackages: ["react-loader-spinner"],
}
