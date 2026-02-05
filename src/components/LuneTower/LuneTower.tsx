import ltBg from '../../assets/lt-bg.png'
import ltRankingBase from '../../assets/lt-ranking-base.png'
import titlebanner from  '../../assets/title-base_genarated.png'
/** ルーンの塔 - メインコンテナ */
export const LuneTower = () => {
  return (
    <div
      className="relative w-full h-full bg-cover bg-center bg-no-repeat flex flex-col"
      style={{ backgroundImage: `url(${ltBg})` }}
    >
      {/* ===== ヘッダーエリア（約16%） ===== */}
      <header className="h-[16%] flex items-center px-4">
        {/* タイトルボタン */}
        <button
          className="h-[80%] px-8 flex items-center justify-center bg-contain bg-center bg-no-repeat text-cmWhitePrimary font-dela-gothic text-shadow-title text-xl"
          style={{ backgroundImage: `url(${titlebanner})` }}
          onClick={() => console.log('タイトルボタンクリック')}
        >
          ルーンの塔
        </button>
      </header>

      {/* ===== ランキングエリア全体（約84%）- lt-ranking-base.png背景 ===== */}
      <main
        className="flex-1 flex flex-col mx-2 mb-2 rounded-lg overflow-hidden bg-cover bg-center bg-no-repeat rounded-md"
        style={{ backgroundImage: `url(${ltRankingBase})` }}
      >
        {/* --- 上部：「ランキング」タイトル + タブ + シーズン + ページネーション --- */}
        <div className="h-[26%] flex items-center px-4 border-black/10">
          <span className="text-CmBasicText font-mplus-rounded text-shadow-default text-sm">
            【上部】「ランキング」タイトル + タブ3つ + シーズン選択 + ページネーション
          </span>
        </div>

        {/* --- コンテンツエリア：左右2カラム構成 --- */}
        <div className="flex-1 flex overflow-hidden p-2 bg-cmModalBg/50 rounded-md border-2 border-white">
          {/* 左カラム：世界ランクタイトル + マイデータパネル */}
          <div className="w-[22%] flex flex-col border-r border-black/10 pr-2">
            <span className="text-CmBasicText font-mplus-rounded text-shadow-default text-xs">
              【左カラム】
            </span>
            <span className="text-CmBasicText font-mplus-rounded text-shadow-default text-xs mt-1">
              ・世界ランクタイトル
            </span>
            <span className="text-CmBasicText font-mplus-rounded text-shadow-default text-xs">
              ・マイデータパネル
            </span>
          </div>

          {/* 右カラム：ランキングリスト（スクロール可能） */}
          <div className="flex-1 flex flex-col pl-2 overflow-hidden">
            <span className="text-CmBasicText font-mplus-rounded text-shadow-default text-sm">
              【右カラム】ランキングユーザーパネル × 10（スクロール可能）
            </span>
          </div>
        </div>
      </main>
    </div>
  )
}
