import { useState } from 'react'
import ltBg from '../../assets/lt-bg.png'
import ltRankingBase from '../../assets/lt-ranking-base.png'
import titlebanner from '../../assets/title-base_genarated.png'
import backArrow from '../../assets/back-arrow.png'
import ltRankingYellowMark from '../../assets/lt-ranking-yellow-mark.png'
import ltWorldRankIcon from '../../assets/lt-world-rank-icon-selected.png'
import ltRivalRankIcon from '../../assets/lt-rival-rank-icon-unselected.png'
import ltRewardIcon from '../../assets/lt-reward-icon-unselected.png'
import ltSeasonBase from '../../assets/lt-season-base.png'
import redCircle from '../../assets/redcircle.png'

/** タブの種類 */
type TabType = 'world' | 'rival' | 'reward'

/** ページネーションの種類 */
type PageRange = '1-30' | '31-60' | '61-100'

/** シーズンの種類 */
type SeasonType = 'season1' | 'season2' | 'season3'

/** シーズンデータ */
const SEASON_DATA: Record<SeasonType, string> = {
  season1: 'Season1 : 2026/04/01 ~ 2026/05/31',
  season2: 'Season2 : 2026/06/01 ~ 2026/07/31',
  season3: 'Season3 : 2026/08/01 ~ 2026/09/30',
}

/** ルーンの塔 - メインコンテナ */
export const LuneTower = () => {
  // タブのstate管理（将来のAPI/DB連携用）
  const [activeTab, setActiveTab] = useState<TabType>('world')
  // ページネーションのstate管理
  const [activePage, setActivePage] = useState<PageRange>('1-30')
  // シーズン選択のstate管理
  const [activeSeason, setActiveSeason] = useState<SeasonType>('season1')
  return (
    <div
      className="relative w-full h-full bg-cover bg-center bg-no-repeat flex flex-col"
      style={{ backgroundImage: `url(${ltBg})` }}
    >
      {/* ===== ヘッダーエリア（約16%） ===== */}
      <header className="h-[16%] flex items-center px-4 gap-2">
        {/* 戻るボタン */}

        {/* タイトルバナー */}
        <div
          className="relative h-[80%] px-8 flex items-center justify-center bg-contain bg-center bg-no-repeat text-cmWhitePrimary font-dela-gothic text-shadow-title text-xl"
          style={{ backgroundImage: `url(${titlebanner})` }}
        >
          {/* 戻るボタン */}
          <button
            className="h-[60%] aspect-square flex items-center justify-center "
            onClick={() => console.log('戻るボタンクリック')}
          >
            <img src={backArrow} alt="戻る" className="h-full w-full object-contain  relative -ml-10" />
          </button>

          {/* タイトルテキスト */}
          ルーンの塔

          {/* ヘルプボタン（右上） */}
          <button
            className="absolute -top-0 -right-1 w-4 h-4 bg-[#2a2a5a] rounded-md flex items-center justify-center text-cmWhitePrimary text-xs border border-[#4a4a8a]"
            onClick={() => console.log('ヘルプボタンクリック')}
          >
            ?
          </button>
        </div>
      </header>

      {/* ===== ランキングエリア全体（約84%）- lt-ranking-base.png背景 ===== */}
      <main
        className="flex-1 flex flex-col mx-2 mb-2 rounded-lg overflow-hidden bg-cover bg-center bg-no-repeat rounded-md"
        style={{ backgroundImage: `url(${ltRankingBase})` }}
      >
        {/* --- 上部：「ランキング」タイトル + タブ + シーズン + ページネーション --- */}
        <div className="h-[26%] flex flex-col px-4 py-2">
          {/* 上段：「ランキング」タイトル + シーズン選択 */}
          <div className="flex items-center justify-between mb-2">
            {/* ランキングタイトル */}
            <div className="relative flex items-center gap-2">
              <img src={ltRankingYellowMark} alt="" className="h-6 w-auto" />
              <span className="text-CmBasicText font-mochiy text-lg text-shadow-default">
                ランキング
              </span>
              {/* ヘルプボタン（右上） */}
              <button
                className="absolute -top-1 -right-4 w-4 h-4 bg-[#2a2a5a] rounded-md flex items-center justify-center text-cmWhitePrimary text-xs font-bold border border-[#4a4a8a]"
                onClick={() => console.log('ランキングヘルプクリック')}
              >
                ?
              </button>
            </div>

            {/* シーズン選択プルダウン */}
            <div
              className="relative flex items-center justify-center min-w-[430px] h-10 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${ltSeasonBase})` }}
            >
              <select
                value={activeSeason}
                onChange={(e) => setActiveSeason(e.target.value as SeasonType)}
                className="appearance-none bg-transparent text-cmWhitePrimary font-mplus-rounded text-sm text-center cursor-pointer focus:outline-none w-full h-full px-6"
              >
                {(Object.keys(SEASON_DATA) as SeasonType[]).map((season) => (
                  <option key={season} value={season} className="text-CmBasicText bg-white">
                    {SEASON_DATA[season]}
                  </option>
                ))}
              </select>
              <span className="absolute right-4 text-cmWhitePrimary text-xs pointer-events-none">▼</span>
            </div>
          </div>

          {/* 下段：タブ3つ + ページネーション */}
          <div className="flex items-center justify-between">
            {/* タブ3つ */}
            <div className="flex items-center gap-2">
              {/* 世界ランクタブ */}
              <button
                className={`flex items-center gap-1 px-4 py-1 rounded-t-md border-2 ${
                  activeTab === 'world'
                    ? 'bg-cmSelectedTab border-cmSelectedTab text-cmWhitePrimary'
                    : 'bg-cmUnselectedTab border-cmUnselectedTabBorder text-cmWhitePrimary/80'
                }`}
                onClick={() => setActiveTab('world')}
              >
                <img src={ltWorldRankIcon} alt="" className="h-4 w-auto" />
                <span className="font-mplus-rounded text-sm font-bold">世界ランク</span>
              </button>

              {/* ライバルランクタブ */}
              <button
                className={`flex items-center gap-1 px-4 py-1 rounded-t-md border-2 ${
                  activeTab === 'rival'
                    ? 'bg-cmSelectedTab border-cmSelectedTab text-cmWhitePrimary'
                    : 'bg-cmUnselectedTab border-cmUnselectedTabBorder text-cmWhitePrimary/80'
                }`}
                onClick={() => setActiveTab('rival')}
              >
                <img src={ltRivalRankIcon} alt="" className="h-4 w-auto" />
                <span className="font-mplus-rounded text-sm font-bold">ライバルランク</span>
              </button>

              {/* 報酬確認タブ */}
              <button
                className={`relative flex items-center gap-1 px-4 py-1 rounded-t-md border-2 ${
                  activeTab === 'reward'
                    ? 'bg-cmSelectedTab border-cmSelectedTab text-cmWhitePrimary'
                    : 'bg-cmUnselectedTab border-cmUnselectedTabBorder text-cmWhitePrimary/80'
                }`}
                onClick={() => setActiveTab('reward')}
              >
                <img src={ltRewardIcon} alt="" className="h-4 w-auto" />
                <span className="font-mplus-rounded text-sm font-bold">報酬確認</span>
                {/* 通知バッジ */}
                <img
                  src={redCircle}
                  alt="通知"
                  className="absolute -top-1 -right-1 w-3 h-3"
                />
              </button>
            </div>

            {/* ページネーション */}
            <div className="flex items-center gap-1">
              {(['1-30', '31-60', '61-100'] as PageRange[]).map((range) => (
                <button
                  key={range}
                  className={`px-3 py-1 rounded border text-sm font-mplus-rounded ${
                    activePage === range
                      ? 'bg-cmWhitePrimary text-CmBasicText border-CmBasicText'
                      : 'bg-transparent text-CmBasicText border-CmBasicText/50'
                  }`}
                  onClick={() => setActivePage(range)}
                >
                  {range.replace('-', '~')}
                </button>
              ))}
            </div>
          </div>
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
