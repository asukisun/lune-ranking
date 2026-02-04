import ltBg from '../../assets/lt-bg.png'

/** ルーンの塔 - メインコンテナ */
export const LuneTower = () => {
  return (
    <div
      className="relative w-full h-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${ltBg})` }}
    >
      {/* Phase 0 確認用: フォント・カラー・text-shadow の動作確認 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        {/* Dela Gothic One (タイトルフォント) */}
        <h1 className="font-dela-gothic text-4xl text-cmWhitePrimary text-shadow-title">
          ルーンの塔
        </h1>

        {/* M Plus Rounded (メインフォント) */}
        <p className="font-mplus-rounded text-xl text-cmWhitePrimary text-shadow-default font-bold">
          M Plus Rounded テスト
        </p>

        {/* Mochiy Pop One */}
        <p className="font-mochiy text-xl text-cmWhitePrimary text-shadow-default">
          Mochiy Pop One テスト
        </p>

        {/* カラー変数確認 */}
        <div className="flex gap-2 mt-4">
          <div className="w-8 h-8 bg-cmSelectedTab rounded" title="cmSelectedTab" />
          <div className="w-8 h-8 bg-cmUnselectedTab rounded" title="cmUnselectedTab" />
          <div className="w-8 h-8 bg-cmModalBg rounded" title="cmModalBg" />
          <div className="w-8 h-8 bg-cmBaseTertiary rounded" title="cmBaseTertiary" />
        </div>
      </div>
    </div>
  )
}
