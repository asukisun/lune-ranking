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
import ltRankingTitleDecoration from '../../assets/lt-ranking-title-decoration.png'
import ltMydataPanelBase from '../../assets/lt-mydata-panel-base.png'
import ltMydataTitleBg from '../../assets/lt-mydata-title-bg.png'
import ltFloorIcon from '../../assets/lt-floor-icon.png'
import ltClockIcon from '../../assets/lt-clock-icon.png'
import ltRankingUserPanelBase from '../../assets/lt-ranking-user-panel-base.png'
// キャラクター画像（仮）- TODO: 実際のキャラ画像に差し替え
import cmMockCharacterImage from '../../assets/character-div-overlay.svg'
// CharacterIcon コンポーネントと型をインポート
import {
  CharacterIcon,
  type CharacterData,
  type AttributeType,
  type AttackType,
  type PositionType,
  type CharacterType,
} from './CharacterIcon'

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

/** ランキングユーザーデータ型 */
type RankingUser = {
  rank: number
  name: string
  floor: number
  time: string
  characters: CharacterData[]
}

/** キャラクターモックデータ生成ヘルパー */
const generateMockCharacters = (): CharacterData[] => {
  const attributes: AttributeType[] = ['fire', 'water', 'earth', 'wind', 'light', 'dark']
  const attackTypes: AttackType[] = ['melee', 'ranged', 'magic']
  const positionTypes: PositionType[] = ['front', 'middle', 'back']
  const characterTypes: CharacterType[] = ['attacker', 'tank', 'defender', 'supporter', 'healer']

  return Array.from({ length: 7 }, (_, idx) => ({
    characterImage: cmMockCharacterImage, // TODO: 実際のキャラ画像に差し替え
    attribute: attributes[idx % attributes.length],
    attackType: attackTypes[idx % attackTypes.length],
    positionType: positionTypes[idx % positionTypes.length],
    characterType: characterTypes[idx % characterTypes.length],
    rarity: (idx % 5) + 1, // 1-5のレアリティ
    level: 50 + idx * 7, // 50, 57, 64, 71, 78, 85, 92
  }))
}

/** ランキングモックデータ（30人分） */
const MOCK_RANKING_DATA: RankingUser[] = Array.from({ length: 30 }, (_, i) => ({
  rank: i + 1,
  name: '最大7文字あああ',
  floor: 999,
  time: '9:59',
  characters: generateMockCharacters(),
}))

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
            className="absolute -top-0 -right-1 w-4 h-4 bg-[#2a2a5a] rounded-md flex items-center justify-center text-cmWhitePrimary text-xs "
            style={{ boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)' }}
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
              <span className="text-cmPurple font-mochiy text-lg text-shadow-default ">
                ランキング
              </span>
              {/* ヘルプボタン（右上） */}
              <button
                className="absolute -top-1 -right-4 w-4 h-4 bg-[#2a2a5a] rounded-md flex items-center justify-center text-cmWhitePrimary text-xs font-bold border border-[#4a4a8a]"
                style={{ boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)' }}
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
                  className="absolute -top-1 -right-1 w-3 h-3 "
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
          <div className="w-[22%] flex flex-col pr-2 gap-2">
            {/* 世界ランクタイトル */}
            <div
              className="relative h-[25%] flex items-center justify-center bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${ltRankingTitleDecoration})` }}
            >
              <span
                className="text-cmWhitePrimary font-dela-gothic text-lg text-shadow-title"
                style={{
                  WebkitTextStroke: '1.5px var(--color-cmUnselectedTab)'
                }}
              >
                世界ランク
              </span>
            </div>

            {/* マイデータセクション（タイトルとパネルを上下に隣接） */}
            <div className="flex-1 flex flex-col items-center">
              {/* マイデータタイトル */}
              <div
                className="h-8 w-26 flex items-center justify-center bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${ltMydataTitleBg})` }}
              >
                <span className="text-cmWhitePrimary font-mplus-rounded text-xs font-bold">
                  マイデータ
                </span>
              </div>

              {/* マイデータパネル（ベージュ部分） */}
              <div
                className="relative flex-1 flex flex-col bg-cover bg-center bg-no-repeat p-2 w-26"
                style={{ backgroundImage: `url(${ltMydataPanelBase})` }}
              >
                {/* マイデータ 注釈ボタン（右上） */}
                <button
                  className="absolute top-1 right-1 w-4 h-4 bg-cmUnselectedTab rounded-md flex items-center justify-center text-cmWhitePrimary text-xs font-bold"
                  style={{ boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)' }}
                  onClick={() => console.log('マイデータ注釈クリック')}
                >
                  !
                </button>

                {/* プレイヤーアイコン（仮） */}
                <div className="flex justify-center mb-2">
                  <div className="w-12 h-12 bg-white rounded flex items-center justify-center">
                    <span className="text-xs text-CmBasicText">ICON</span>
                  </div>
                </div>

                {/* 順位 */}
                <div className="text-center mb-2">
                  <span className="text-CmBasicText font-mplus-rounded text-lg font-bold">
                    10000位
                  </span>
                </div>

                {/* フロア + タイム */}
                <div className="flex items-center justify-center gap-4">
                  {/* フロア */}
                  <div className="flex items-center gap-1">
                    <img src={ltFloorIcon} alt="フロア" className="h-4 w-auto" />
                    <span className="text-CmBasicText font-mplus-rounded text-xs font-bold">
                      999
                    </span>
                  </div>

                  {/* タイム */}
                  <div className="flex items-center gap-1">
                    <img src={ltClockIcon} alt="タイム" className="h-4 w-auto" />
                    <span className="text-CmBasicText font-mplus-rounded text-xs font-bold">
                      5:00
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* 右カラム：ランキングリスト（スクロール可能） */}
          <div className="flex-1 flex flex-col pl-2 pr-4 overflow-y-auto overflow-x-hidden gap-2 mq-story-scrollbar">
            {MOCK_RANKING_DATA.map((user) => (
              <div
                key={user.rank}
                className="flex items-center h-15 min-h-15 bg-cover bg-center bg-no-repeat px-2 gap-2 border-2 border-white"
                style={{
                  backgroundImage: `url(${ltRankingUserPanelBase})`,
                  borderRadius: '12px 4px 12px 4px'  /* 左上緩やか 右上急 右下緩やか 左下急 */
                }}
              >
                {/* 順位 */}
                <div
                  className={`w-8 h-full flex items-center justify-center font-bold text-cmWhitePrimary text-lg border-2 border-white -ml-2 -my-2 ${
                    user.rank === 1 ? 'bg-yellow-400' :
                    user.rank === 2 ? 'bg-blue-400' :
                    user.rank === 3 ? 'bg-red-500' :
                    'bg-[#AF8457]'
                  }`}
                  style={{ borderRadius: '12px 4px 12px 4px' }}
                >
                  {user.rank}
                </div>

                {/* プレイヤーアイコン */}
                <div className="w-6 h-6 bg-white rounded flex items-center justify-center flex-shrink-0 self-start mt-1">
                  <span className="text-xs text-CmBasicText">ICON</span>
                </div>

                {/* プレイヤー情報 */}
                <div className="flex flex-col justify-center">
                  <span className="text-CmBasicText font-mplus-rounded text-sm font-bold">
                    {user.name}
                  </span>
                  <div className="flex items-center gap-3">
                    {/* フロア */}
                    <div className="flex items-center gap-1">
                      <img src={ltFloorIcon} alt="フロア" className="h-5 w-auto" />
                      <span className="text-CmBasicText font-mplus-rounded text-xs">
                        {user.floor}
                      </span>
                    </div>
                    {/* タイム */}
                    <div className="flex items-center gap-1">
                      <img src={ltClockIcon} alt="タイム" className="h-5 w-auto" />
                      <span className="text-CmBasicText font-mplus-rounded text-xs">
                        {user.time}
                      </span>
                    </div>
                  </div>
                </div>

                {/* キャラアイコン ×7 */}
                <div className="flex-1 flex items-center justify-center gap-1">
                  {user.characters.map((char, idx) => (
                    <CharacterIcon
                      key={idx}
                      characterImage={char.characterImage}
                      attribute={char.attribute}
                      attackType={char.attackType}
                      positionType={char.positionType}
                      characterType={char.characterType}
                      rarity={char.rarity}
                      level={char.level}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
