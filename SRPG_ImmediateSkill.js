//=============================================================================
// SRPG_ImmediateSkill.js
// バージョン   : 1.00
// 最終更新日   : 2018/7/1
// 制作         : 神鏡学斗
// 配布元       : http://www.lemon-slice.net/
//-----------------------------------------------------------------------------
// copyright 2017 - 2018 Lemon slice all rights reserved.
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc Create skills that do not consume turns in SRPG converter.
 * @author Gakuto Mikagami
 *
 * @help This plugin does not provide plugin commands.
 * 
 * If you write <ImmediateSkill: true> in a skill's note, 
 * that skill becomes a skill that does not consume turns.
 * Please put it below SRPG_core in the plugin management window.
 * Auto battle actors and enemy do not use this skill.
 */

/*:ja
 * @plugindesc ＳＲＰＧコンバータでターンを消費しないスキルを作れるようにします。
 * @author 神鏡学斗
 *
 * @help このプラグインには、プラグインコマンドはありません。
 * 
 * スキルのメモに<ImmediateSkill:true>と記入すると
 * ターンを消費しないスキルになります。
 * プラグイン管理画面でSRPG_coreより下に配置してください。
 * 自動行動アクターとエネミーはこのスキルを使用しません。
 */

(function() {

//====================================================================
// ●Game_Temp
//====================================================================
    //初期化処理
    var _SRPG_Game_Temp_initialize = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function() {
    _SRPG_Game_Temp_initialize.call(this);
    this._ImmediateSkill = false;
    };

    //ターン非消費スキルかを返す
    Game_Temp.prototype.SrpgImmediateSkill = function() {
        return this._ImmediateSkill;
    };

    //ターン非消費スキルかを設定する
    Game_Temp.prototype.setSrpgImmediateSkill = function(val) {
        this._ImmediateSkill = val;
    };

//====================================================================
// ●Game_Temp
//====================================================================
    // スキル・アイテムが使用可能かの判定
    var _SRPG_IS_Game_BattlerBase_canUse = Game_BattlerBase.prototype.canUse;
    Game_BattlerBase.prototype.canUse = function(item) {
        if (!item) {
            return false;
        }
        if (this.isAutoBattle() && item.meta.ImmediateSkill == 'true') {
            return false;
        }
        return _SRPG_IS_Game_BattlerBase_canUse.call(this, item);
    };

//====================================================================
// ●Scene_Map
//====================================================================
    //戦闘開始コマンド・戦闘開始
    var _SRPG_IS_Scene_Map_commandBattleStart = Scene_Map.prototype.commandBattleStart;
    Scene_Map.prototype.commandBattleStart = function() {
        var actionArray = $gameSystem.srpgBattleWindowNeedRefresh()[1];
        var skill = actionArray[1].currentAction().item();
        if (skill.meta.ImmediateSkill == 'true') {
            $gameTemp.setSrpgImmediateSkill(true);
        } else {
            $gameTemp.setSrpgImmediateSkill(false);
        }
        _SRPG_IS_Scene_Map_commandBattleStart.call(this);
    };

    //行動終了時の処理
    //戦闘終了の判定はイベントで行う。
    var _SRPG_IS_Scene_Map_srpgAfterAction = Scene_Map.prototype.srpgAfterAction;
    Scene_Map.prototype.srpgAfterAction = function() {
        if ($gameTemp.SrpgImmediateSkill() == true) {
            $gameTemp.setSrpgImmediateSkill(false);
            var event = $gameTemp.activeEvent();
            var battlerArray = $gameSystem.EventToUnit(event.eventId());
            $gameSystem.setSrpgActorCommandStatusWindowNeedRefresh(battlerArray);
            $gameSystem.clearSrpgStatusWindowNeedRefresh();
            $gameSystem.clearSrpgBattleWindowNeedRefresh();
            $gameTemp.setSrpgDistance(0);
            $gameTemp.clearTargetEvent();
            $gameTemp.clearMoveTable();
            $gameTemp.initialMoveTable($gameTemp.originalPos()[0], $gameTemp.originalPos()[1], battlerArray[1].srpgMove());
            event.makeMoveTable($gameTemp.originalPos()[0], $gameTemp.originalPos()[1], battlerArray[1].srpgMove(), [0], battlerArray[1].srpgThroughTag());
            var list = $gameTemp.moveList();
            for (var i = 0; i < list.length; i++) {
                var pos = list[i];
                event.makeRangeTable(pos[0], pos[1], battlerArray[1].srpgWeaponRange(), [0]);
            }
            $gameTemp.pushRangeListToMoveList();
            $gameTemp.setResetMoveList(true);
            battlerArray[1].srpgMakeNewActions();
            $gameSystem.setSrpgActorCommandWindowNeedRefresh(battlerArray);
            $gameSystem.setSubBattlePhase('actor_command_window');
        } else {
            _SRPG_IS_Scene_Map_srpgAfterAction.call(this);
        }
    };

})();
