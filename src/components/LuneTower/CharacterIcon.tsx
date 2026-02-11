// ============================================
// キャラアイコン関連のインポート
// ============================================
// 属性背景（火属性）
import cmFireCharacterIconBase from '../../assets/cm-fire-character-icon-base.png'
// 属性マーク（右上）- TODO: 実際の画像に差し替え
import cmAttributeMarkFire from '../../assets/cm-fire-icon.png'
// ポジションタイプアイコン（前衛）
import cmFrontPositionIcon from '../../assets/cm-front-chara-icon.png'
// 攻撃タイプ（右中央）- TODO: 実際の画像に差し替え
import cmAttackTypeMelee from '../../assets/cm-crush-icon.png'
// キャラタイプ（左下）
import cmCharacterTypeTank from '../../assets/cm-tank-icon.png'
// TODO: 他のキャラタイプ画像を追加
// import cmCharacterTypeAttacker from '../../assets/cm-attacker-icon.png'
// import cmCharacterTypeDefender from '../../assets/cm-defender-icon.png'
// import cmCharacterTypeSupporter from '../../assets/cm-supporter-icon.png'
// import cmCharacterTypeHealer from '../../assets/cm-healer-icon.png'
// レアリティマーク（左上）
import cmRarityStar from '../../assets/rare-rate-star.png'

// ============================================
// キャラクターアイコン関連の型定義
// ============================================

/** 属性タイプ */
export type AttributeType = 'fire' | 'water' | 'earth' | 'wind' | 'light' | 'dark'

/** 攻撃タイプ */
export type AttackType = 'melee' | 'ranged' | 'magic'

/** キャラポジションタイプ */
export type PositionType = 'front' | 'middle' | 'back'

/** キャラタイプ（5種類） */
export type CharacterType = 'attacker' | 'tank' | 'defender' | 'supporter' | 'healer'

/** キャラクターデータ型 */
export type CharacterData = {
  characterImage: string
  attribute: AttributeType
  attackType: AttackType
  positionType: PositionType
  characterType: CharacterType
  rarity: number
  level: number
}

/** キャラクターアイコンのProps */
export type CharacterIconProps = CharacterData

// ============================================
// 属性別背景画像マッピング（将来的に差し替え可能）
// ============================================
const ATTRIBUTE_BG_MAP: Record<AttributeType, string> = {
  fire: cmFireCharacterIconBase,
  water: cmFireCharacterIconBase, // TODO: 差し替え
  earth: cmFireCharacterIconBase,
  wind: cmFireCharacterIconBase,
  light: cmFireCharacterIconBase,
  dark: cmFireCharacterIconBase,
}

/** 属性マーク画像マッピング */
const ATTRIBUTE_MARK_MAP: Record<AttributeType, string> = {
  fire: cmAttributeMarkFire,
  water: cmAttributeMarkFire,
  earth: cmAttributeMarkFire,
  wind: cmAttributeMarkFire,
  light: cmAttributeMarkFire,
  dark: cmAttributeMarkFire,
}

/** 攻撃タイプ画像マッピング */
const ATTACK_TYPE_MAP: Record<AttackType, string> = {
  melee: cmAttackTypeMelee,
  ranged: cmAttackTypeMelee,
  magic: cmAttackTypeMelee,
}

/** ポジションタイプ画像マッピング */
const POSITION_TYPE_MAP: Record<PositionType, string> = {
  front: cmFrontPositionIcon,
  middle: cmFrontPositionIcon, // TODO: 中衛アイコンに差し替え
  back: cmFrontPositionIcon,   // TODO: 後衛アイコンに差し替え
}

/** キャラタイプ画像マッピング（5種類） */
const CHARACTER_TYPE_MAP: Record<CharacterType, string> = {
  attacker: cmCharacterTypeTank,  // TODO: attacker用画像に差し替え
  tank: cmCharacterTypeTank,
  defender: cmCharacterTypeTank,  // TODO: defender用画像に差し替え
  supporter: cmCharacterTypeTank, // TODO: supporter用画像に差し替え
  healer: cmCharacterTypeTank,    // TODO: healer用画像に差し替え
}

// ============================================
// CharacterIcon コンポーネント
// ============================================
/**
 * キャラクターアイコンコンポーネント
 * - 属性背景（下層）
 * - キャラ画像（中層）
 * - 各種オーバーレイ（上層）
 *   - 属性マーク（右上）
 *   - 攻撃タイプ（右中央）
 *   - ポジションタイプ（左下）
 *   - キャラタイプ（ポジション上）
 *   - レアリティ星（左上、縦並び）
 *   - レベル表示（下部中央）
 */
export const CharacterIcon = ({
  characterImage,
  attribute,
  attackType,
  positionType,
  characterType,
  rarity,
  level,
}: CharacterIconProps) => {
  return (
    <div className="relative w-11 h-11 flex items-center justify-center context-menu-ds ">
      {/* 属性背景（下層） */}
      <div
        className="absolute inset-0 bg-contain bg-center bg-no-repeat rounded-lg border-3 border-white"
        style={{ backgroundImage: `url(${ATTRIBUTE_BG_MAP[attribute]})` }}
      />

      {/* キャラ画像（中層） */}
      <img
        src={characterImage}
        alt="キャラ"
        className="relative z-10 w-8 h-8 object-contain"
      />

      {/* 属性マーク（右上） */}
      <img
        src={ATTRIBUTE_MARK_MAP[attribute]}
        alt={attribute}
        className="absolute top-0 right-0 w-3 h-3 z-20 object-contain"
      />

      {/* 攻撃タイプ（右中央） */}
      <img
        src={ATTACK_TYPE_MAP[attackType]}
        alt={attackType}
        className="absolute top-1/3.5 right-0 -translate-y-1/2 w-2 h-2 z-20 object-contain"
      />

      {/* キャラタイプ（左下のポジション上） */}
      <img
        src={CHARACTER_TYPE_MAP[characterType]}
        alt={characterType}
        className="absolute bottom-3 left-0 w-2.5 h-2.5 z-20 object-contain"
      />

      {/* ポジションタイプ（左下） */}
      <img
        src={POSITION_TYPE_MAP[positionType]}
        alt={positionType}
        className="absolute bottom-0 left-0 w-2.5 h-2.5 z-20 object-contain"
      />

      {/* レアリティ星（左上、右方向に重ねて表示、15度回転） */}
      <div className="absolute top-0 left-0 flex z-20">
        {Array.from({ length: Math.min(rarity, 5) }).map((_, idx) => (
          <img
            key={idx}
            src={cmRarityStar}
            alt="★"
            className="w-3 h-3 object-contain "
            style={{
              marginLeft: idx === 0 ? 0 : -7, // レア星 2個目以降 重ね具合の調整
              transform: 'rotate(15deg)',
              filter: 'drop-shadow(0.2vh 0.2vh 0.2vh rgba(0, 0, 0, 0.5))',
            }}
          />
        ))}
      </div>

      {/* レベル表示（下部右寄せ） */}
      <span className="absolute -bottom-1 right-0 font-mplus-rounded font-bold text-stroke-white text-orange-400 z-20 text-shadow-default">
        <span className="text-[1.8vh]">Lv.</span>
        <span className="text-[2.8vh]">{level}</span>
      </span>
    </div>
  )
}
