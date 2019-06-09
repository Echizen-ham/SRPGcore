//=============================================================================
// SRPG_YEP_BattleEngineCore.js -SRPGコンバータMV用追加プラグイン-
// バージョン: 1.00
// 最終更新日: 2017/11/11
// 配布元    : http://www.lemon-slice.net/
//-----------------------------------------------------------------------------
// copyright 2017 Lemon slice all rights reserved.
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc This plugin able to use SRPG converter MV with YEP_BattleEngineCore.js.
 * @author Gakuto Mikagami
 *
 * @help This plugin does not provide plugin commands.
 *
 * Adding plugin for SRPG converter MV.
 * You can use 'cast animation'.
 * Insert under SRPG_core.js and YEP_BattleEngineCore.js.
 *
 * If you don't display cast animation, you write <Cast Animation: 0> on skill note.
 */

/*:ja
 * @plugindesc YEP_BattleEngineCore.jsとの競合対策をします。
 * @author 神鏡学斗
 *
 * @help このプラグインにはプラグインコマンドはありません。
 *
 * SRPGコンバータＭＶ用追加プラグインです。
 * cast animationを実行できるようにします。
 * SRPG_core.js および YEP_BattleEngineCore.jsより下に入れてください。
 *
 * 表示したくない時は、スキルのメモ欄に<Cast Animation: 0>と記入してください。
 */

//アクタースプライトの基準位置
var _SRPG_Sprite_Actor_setActorHome = Sprite_Actor.prototype.setActorHome;
Sprite_Actor.prototype.setActorHome = function(index) {
    if ($gameSystem.isSRPGMode() == true) {
        this.setHome(Graphics.width - 216 - index * 240, Graphics.height / 2 + 48);
        this.moveToStartPosition();
    } else {
        _SRPG_Sprite_Actor_setActorHome.call(this, index);
    }
};

BattleManager.actionCastAnimation = function() {
  if (!$gameSystem.isSideView() && this._subject.isActor()) return true;
  if (!this._action.isGuard() && this._action.isSkill()) {
    if (this._action.item().castAnimation > 0) {
      var ani = $dataAnimations[this._action.item().castAnimation]
      this._logWindow.showAnimation(this._subject, [this._subject],
        this._action.item().castAnimation);
    }
  }
  return true;
};

BattleManager.invokeAction = function(subject, target) {
  if (!eval(Yanfly.Param.BECOptSpeed)) this._logWindow.push('pushBaseLine');
  var normal = true;
  if (Math.random() < this._action.itemMrf(target)) {
    this.invokeMagicReflection(subject, target);
  } else if (Math.random() < this._action.itemCnt(target)) {
    if ($gameSystem.isSRPGMode() == true) {
      var attackSkill = $dataSkills[target.attackSkillId()]
      if (target.canUse(attackSkill) == true) {
          this.invokeCounterAttack(subject, target);
      } else {
          this.invokeNormalAction(subject, target);
      }
    } else {
      this.invokeCounterAttack(subject, target);
    }
  } else {
    this.invokeNormalAction(subject, target);
  }
  if (subject) subject.setLastTarget(target);
  if (!eval(Yanfly.Param.BECOptSpeed)) this._logWindow.push('popBaseLine');
  if ($gameSystem.isSRPGMode() == true) this.refreshStatus();
};


