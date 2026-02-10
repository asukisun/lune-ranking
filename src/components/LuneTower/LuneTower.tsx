import { useState } from 'react'
import ltBg from '../../assets/lt-bg-2.png'
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

  return Array.from({ length: 8 }, (_, idx) => ({
    characterImage: cmMockCharacterImage, // TODO: 実際のキャラ画像に差し替え
    attribute: attributes[idx % attributes.length],
    attackType: attackTypes[idx % attackTypes.length],
    positionType: positionTypes[idx % positionTypes.length],
    characterType: characterTypes[idx % characterTypes.length],
    rarity: (idx % 5) + 1, // 1-5のレアリティ
    level: 50 + idx * 8, // 50, 57, 64, 71, 78, 85, 92
  }))
}

/** ランキングモックデータ（30人分） */
const MOCK_RANKING_DATA: RankingUser[] = Array.from({ length: 30 }, (_, i) => ({
  rank: i + 1,
  name: '最大7文字ああ',
  floor: 999,
  time: '9:59',
  characters: generateMockCharacters(),
}))

// ============================================
// 順位別スタイル定義
// ============================================
type RankStyle = {
  className: string
  style: React.CSSProperties
}

/** 順位別スタイル（順位表示部分） */
const RANK_BADGE_STYLES: Record<1 | 2 | 3 | 'default', RankStyle> = {
  1: {
    className: 'text-[#F4CE62] ' ,
    style: {
      // background: 'linear-gradient(135deg, #FFFF00 0%, #F5D45D 100%)', // 金色グラデーション
      background: 'var(--gradient-lanking-yellow)'
    },
  },
  2: {
    className: 'text-gray-400',
    style: {
      // background: 'linear-gradient(135deg, #48BFFF 0%, #8A9CAE 100%)', // 銀色グラデーション
      background: 'var(--gradient-lanking-blue)'
    },
  },
  3: {
    className: 'text-[#7A403F] ',
    style: {
      // background: 'linear-gradient(135deg, #EF4444 0%, #991B1B 100%)', // 赤グラデーション
      background: 'var(--gradient-lanking-red)', // 赤グラデーション
    },
  },
  default: {
    className: 'bg-[#AF8457]',
    style: {},
  },
}

/** 順位別スタイル（プレイヤー名 部分） */
const RANK_NAME_STYLES: Record<1 | 2 | 3 | 'default', RankStyle> = {
  1: {
    className: 'text-grad-lanking-name-yellow text-stroke-white',
    style: {},
  },
  2: {
    className: 'text-gray-500 text-stroke-white',
    style: {},
  },
  3: {
    className: 'text-grad-cm-emphasis-red text-stroke-white',
    style: {},
  },
  default: {
    className: 'text-grad-cm-emphasis-text-brown text-stroke-white ',
    style: {},
  },
}

/** 順位からスタイルを取得するヘルパー */
const getRankStyle = (rank: number, styles: Record<1 | 2 | 3 | 'default', RankStyle>): RankStyle => {
  if (rank === 1) return styles[1]
  if (rank === 2) return styles[2]
  if (rank === 3) return styles[3]
  return styles.default
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
      className="relative w-full h-full bg-cover bg-center bg-no-repeat flex flex-col white-edge-glow"
      style={{
        backgroundImage: `url(${ltBg})`,
        // filter: 'brightness(1.2) saturate(0.8)'
      }}
    >
    {/* 背景に 白いオーバーレイ（淡くするフィルター） */}
    {/* <div className="absolute inset-0 bg-fuchsia-400/30 pointer-events-none" /> */}
    
      {/* ===== ヘッダーエリア（約16%） ===== */}
      <header className="h-[13%] flex items-center px-2 gap-2">
        {/* 戻るボタン */}

        {/* タイトルバナー */}
        <div
          className="relative h-[80%] px-8 flex items-center justify-center rounded-lg bg-contain bg-center bg-no-repeat text-cmWhitePrimary font-dela-gothic text-shadow-title text-xl context-menu-ds"
          style={{
            backgroundImage: `url(${titlebanner})`,
            filter: 'drop-shadow(4px 4px 0px rgba(0, 0, 0, 0.3))'
          }}
        >
          {/* 戻るボタン */}
          <button
            className="h-[60%] aspect-square flex items-center justify-center context-menu-ds "
            onClick={() => console.log('戻るボタンクリック')}
          >
            <img src={backArrow} alt="戻る" className="h-full w-full object-contain  relative -ml-10" />
          </button>

          {/* タイトルテキスト  後ほど適切なタイトルバナー画像素材に差し替えてください。*/}
          ルーンの塔

          {/* ヘルプボタン（右上） 差し替えるタイトルバナー画像に合わせて色を変えてください */}
          <button
            className="font-mplus-rounded absolute top-2 right-1 w-2 h-2 bg-[#600EED] rounded-xs flex items-center justify-center text-cmWhitePrimary text-[7px] context-menu"
            // style={{ boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.4)' }}
            onClick={() => console.log('ヘルプボタンクリック')}
          >
            ?
          </button>
        </div>
      </header>

      {/* ===== ランキングエリア全体（約84%）- lt-ranking-base.png背景 ===== */}
      <main
        className="flex-1 flex flex-col mx-2 mb-2 rounded-lg overflow-hidden bg-[length:100%_100%] bg-center bg-no-repeat rounded-md p-1"
        style={{ backgroundImage: `url(${ltRankingBase})` }}
      >
        {/* --- 上部：「ランキング」タイトル + タブ + シーズン + ページネーション --- */}
        <div className="h-[20%] flex flex-col px-2 py-2">
          {/* 上段：「ランキング」タイトル + シーズン選択 */}
          <div className="flex justify-between">
            {/* ランキングタイトル */}
            <div className="relative flex justify-between items-end mt-2 gap-2 border-2 border-white rounded-sm bg-cmModalBg/50 h-4 context-menu ">
              <img src={ltRankingYellowMark} alt="" className="h-7 w-auto flex justify-between items-end mt-2 context-menu-ds" />
              <span className="text-cmPurple font-dela-gothic text-2xl text-stroke-white-m text-shadow-default ">
                ランキング
              </span>
              {/* ヘルプボタン（右上） */}
              <button
                className="absolute -top-2 -right-3 w-2 h-2 bg-cmUnselectedTabBorder rounded-xs flex items-center justify-center text-cmWhitePrimary text-[7px] context-menu"
                onClick={() => console.log('ランキングヘルプクリック')}
              >
                ?
              </button>
            </div>

            {/* シーズン選択プルダウン */}
            <div
              className="relative flex items-center justify-end min-w-[350px] h-8 bg-contain bg-right bg-center bg-no-repeat px-2 context-menu-ds "
              style={{ 
                backgroundImage: `url(${ltSeasonBase})`,
                filter: 'drop-shadow(3px 3px 0px rgba(0, 0, 0, 0.3))'
              }}
            >
              <select
                value={activeSeason}
                onChange={(e) => setActiveSeason(e.target.value as SeasonType)}
                className="appearance-none bg-transparent text-cmWhitePrimary font-mplus-rounded font-extrabold text-stroke-purple-sm text-xs text-end gap-3 cursor-pointer focus:outline-none w-full h-full px-2.5"
              >
                {(Object.keys(SEASON_DATA) as SeasonType[]).map((season) => (
                  <option key={season} value={season} className="text-CmBasicText bg-white">
                    {SEASON_DATA[season]}
                  </option>
                ))}
              </select>
              <span className="absolute right-2 text-cmWhitePrimary text-xs pointer-events-none">▼</span>
            </div>
          </div>

          {/* 下段：タブ3つ + ページネーション */}
          <div className="flex items-center justify-between font-mplus-rounded text-sm font-bold text-cmWhitePrimary ">
            {/* タブ3つ */}
            <div className="flex items-center gap-2 ">
              {/* 世界ランクタブ */}
              <button
                className={`flex items-center gap-1 px-4 py-1 h-6 rounded-xs text-cmWhitePrimary text-shadow-default border-2 context-menu ${
                  activeTab === 'world'
                    ? 'bg-cmSelectedTab border-CmBasicText border-white '
                    : 'bg-cmUnselectedTab border-CmBasicText/50 border-black '
                }`}
                onClick={() => setActiveTab('world')}
              >
                <img src={ltWorldRankIcon} alt="" className="h-4 w-auto context-menu-ds" />
                <span className="">世界ランク</span>
              </button>

              {/* ライバルランクタブ */}
              <button
                className={`flex items-center gap-1 px-4 py-1 h-6 rounded-xs border-2 context-menu text-shadow-default ${
                  activeTab === 'rival'
                    ? 'bg-cmSelectedTab border-CmBasicText border-white '
                    : 'bg-cmUnselectedTab border-CmBasicText/50 border-black '
                }`}
                onClick={() => setActiveTab('rival')}
              >
                <img src={ltRivalRankIcon} alt="" className="h-4 w-auto context-menu-ds" />
                <span className="">ライバルランク</span>
              </button>

              {/* 報酬確認タブ */}
              <button
                className={`relative flex items-center gap-1 px-4 py-1 h-6 rounded-xs border-2  context-menu text-shadow-default ${
                  activeTab === 'reward'
                    ? 'bg-cmSelectedTab border-CmBasicText border-white '
                    : 'bg-cmUnselectedTab border-CmBasicText/50 border-black '
                }`}
                onClick={() => setActiveTab('reward')}
              >
                <img src={ltRewardIcon} alt="" className="h-4 w-auto context-menu-ds" />
                <span className="">報酬確認</span>
                {/* 通知バッジ */}
                <img
                  src={redCircle}
                  alt="通知"
                  className="absolute -top-1 -right-1 w-3 h-3 "
                />
              </button>
            </div>

            {/* ページネーション */}
            <div className="flex items-center justify-center gap-1 font-mplus-rounded font-extrabold text-cmWhitePrimary text-sm text-stroke-brown ">
              {(['1-30', '31-60', '61-100'] as PageRange[]).map((range) => (
                <button
                  key={range}
                  className={`flex items-center justify-center px-3 py-1 h-6 rounded border-2 text-shadow-default context-menu ${
                    activePage === range
                      ? 'bg-cmSelectedTab border-CmBasicText border-white '
                      : 'bg-cmUnselectedTab border-CmBasicText/50 border-black '
                  }`}
                  onClick={() => setActivePage(range)}
                  style={{
                    borderRadius: '12px 4px 12px 4px'  /* 左上緩やか 右上急 右下緩やか 左下急 */
                  }}
                >
                  {range.replace('-', '~')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* --- コンテンツエリア：左右2カラム構成 --- */}
        <div className="flex-1 flex overflow-hidden p-2 bg-cmModalBg/50 rounded-3xl border-2 border-white context-menu">

          {/* ========== 左カラム：世界ランク + マイデータ ========== */}
          <div className="w-[16%] flex flex-col items-center justify-center pr-0 gap-1">

            {/* --- 世界ランクタイトル --- */}
            <div
              className="relative w-full h-[25%] flex items-center justify-center bg-contain bg-center bg-no-repeat context-menu-ds"
              style={{ backgroundImage: `url(${ltRankingTitleDecoration})` }}
            >
              <span
                className="text-cmWhitePrimary font-mplus-rounded text-3xl text-shadow-title font-extrabold text-stroke-brown "
                style={{
                  // WebkitTextStroke: '0.5px',
                  webkitTextStrokeWidth: '1.5px'
                }}
              >
                世界ランク
              </span>
            </div>

            {/* --- マイデータセクション --- */}
            <div className="flex-1 flex flex-col items-center w-full">

              {/* マイデータタイトル */}
              <div
                className="h-8 w-24 flex items-center justify-center bg-contain bg-center bg-no-repeat rounded-md context-menu"
                style={{ backgroundImage: `url(${ltMydataTitleBg})` }}
              >
                <span className="text-cmWhitePrimary text-sm font-mplus-rounded font-extrabold text-stroke-brown ">
                  マイデータ
                </span>
              </div>

              {/* マイデータパネル（ベージュ部分） */}
              <div
                className="relative flex-1 flex flex-col bg-cover bg-center bg-no-repeat items-center justify-center p-2 w-24 rounded-md border-2 border-white context-menu-bis"
                style={{
                  backgroundImage: `url(${ltMydataPanelBase})`
                }}
              >
                {/* 注釈ボタン（右上） */}
                <button
                  className="absolute top-2 right-2 w-2 h-2 bg-cmUnselectedTab rounded-xs flex items-center justify-center text-cmWhitePrimary text-[8px] context-menu"
                  // style={{ boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)' }}
                  onClick={() => console.log('マイデータ注釈クリック')}
                >
                  !
                </button>

                {/* プレイヤーアイコン（仮） */}
                <div className="flex justify-center mb-2">
                  <div className="w-12 h-12 bg-white rounded flex items-center justify-center context-menu">
                    <span className="text-xs text-CmBasicText">ICON</span>
                  </div>
                </div>

                {/* 順位 */}
                <div className="text-center mb-2">
                  <span className="text-yellow-700 font-mplus-rounded text-lg font-extrabold text-stroke-white-m text-shadow-default">
                    10001位
                  </span>
                </div>

                {/* フロア + タイム */}
                <div className="flex items-center justify-center gap-1 ">
                  {/* フロア */}
                  <div className="flex items-center gap-1 context-menu-ds">
                    <img src={ltFloorIcon} alt="フロア" className="h-4 w-auto" />
                    <span className="text-white text-CmWhitePrimary font-mplus-rounded text-lg font-extrabold text-stroke-purple ">
                      999
                    </span>
                  </div>
                  {/* タイム */}
                  <div className="flex items-center gap-0.5 context-menu-ds">
                    <img src={ltClockIcon} alt="タイム" className="h-4 w-auto" />
                    <span className="text-white text-CmBasicText font-mplus-rounded text-lg font-extrabold text-stroke-purple ">
                      5:00
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>
          {/* ========== /左カラム ここまで ========== */}

          {/* 右カラム：ランキングリスト（スクロール可能） */}
          <div className="flex-1 flex flex-col pl-2 pr-4 overflow-y-auto overflow-x-hidden gap-2 mq-story-scrollbar ">
            {MOCK_RANKING_DATA.map((user) => (
              <div
                key={user.rank}
                className="flex items-center h-15 min-h-15 bg-cover bg-center bg-no-repeat px-2 gap-2 border-2 border-white context-menu-bis"
                style={{
                  backgroundImage: `url(${ltRankingUserPanelBase})`,
                  borderRadius: '20px 6px 20px 6px',  /* 左上緩やか 右上急 右下緩やか 左下急 */
                }}
              >
                {/* 順位 */}
                <div
                  className={`w-5 h-15 flex items-center justify-center font-dela-gothic font-bold text-xl text-shadow-lg/30 border-2 border-white -ml-2.5 overflow-visible context-menu ${
                    getRankStyle(user.rank, RANK_BADGE_STYLES).className
                  }`}
                  style={{
                    ...getRankStyle(user.rank, RANK_BADGE_STYLES).style,
                    borderRadius: '20px 6px 20px 6px',
                    WebkitTextStroke: '1px var(--color-cmWhitePrimary)',
                  }}
                >
                  {user.rank}
                </div>

                {/* プレイヤーアイコン */}
                <div className="w-6 h-6 bg-white rounded flex items-center justify-center flex-shrink-0 self-start mt-3 context-menu-ds ">
                  <span className="text-xs text-CmBasicText">ICON</span>
                </div>

                {/* プレイヤー情報 */}
                <div className="flex flex-col justify-center gap-1">
                  <span
                    className={`font-mochiy text-base font-bold context-menu-ds ${
                      getRankStyle(user.rank, RANK_NAME_STYLES).className
                    }`}
                    style={getRankStyle(user.rank, RANK_NAME_STYLES).style}
                  >
                    {user.name}
                  </span>
                  <div className="flex items-center gap-1">
                    {/* フロア */}
                    <div className="flex items-center gap-1">
                      <img src={ltFloorIcon} alt="フロア" className="h-4 w-auto context-menu-ds" />
                      <span className="text-white text-[15px] font-mplus-rounded font-extrabold text-xs text-stroke-purple text-shadow-default">
                        {user.floor}
                      </span>
                    </div>
                    {/* タイム */}
                    <div className="flex items-center gap-1">
                      <img src={ltClockIcon} alt="タイム" className="h-4 w-auto context-menu-ds" />
                      <span className="text-white text-[15px] font-mplus-rounded font-extrabold text-xs text-stroke-purple text-shadow-default">
                        {user.time}
                      </span>
                    </div>
                  </div>
                </div>

                {/* キャラアイコン ×8（8個目は非表示、将来の拡張用） */}
                {/* 8個目表示 の際は、className云々で記述したidx 7番オブジェクトhidden指定を除去する。*/}
                <div className="flex-1 flex items-center gap-1 bg-cmBaseTertiary rounded-md p-1 ">
                  {user.characters.map((char, idx) => (
                    <div key={idx} className={idx === 7 ? 'hidden' : ''}>
                    {/* <div key={idx}> */}
                      <CharacterIcon
                        characterImage={char.characterImage}
                        attribute={char.attribute}
                        attackType={char.attackType}
                        positionType={char.positionType}
                        characterType={char.characterType}
                        rarity={char.rarity}
                        level={char.level}
                      />
                    </div>
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
