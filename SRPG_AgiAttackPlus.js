//=============================================================================
// SRPG_AgiAttackPlus.js
// バージョン   : 1.02
// 最終更新日   : 2019/2/24
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
 * @param srpgAgilityAffectsRatio
 * @desc This is the ratio at which the difference in agility affects the probability of attack twice.
 * @default 2
 *
 * @help This plugin does not provide plugin commands.
 * 
 * You need SRPG converter for MV Ver.1.12.
 * 
 * Typically, attacks are executed one by one in descending order of higher agility, 
 * but if you introduce this plug-in, you will act in the order of 
 * attacker → defender → agile high character additional attack.
 * Actions targeted on your side or yourself will not act twice.
 * Also, if you enter <doubleAction: false> in the note of skill, it will not act twice.
 * 
 * By changing srpgAgilityAffectsRatio you can change the probability of attack twice.
 * Set "Generate 100% if X times or more", while the probability changes according to the difference in agility.
 * srpgAgilityAffectsRatio: 1 → 100% if agility is more than 1 time.
 * srpgAgilityAffectsRatio: 2 → 100% if agility is more than twice.
 *  25% if 1.25 times, 50% if 1.5 times.
 * srpgAgilityAffectsRatio: 3 → 100% if agility is over 3 times.
 *  If it is 1.5 times, it is 25%, if it is doubled it is 50%.
 */

/*:ja
 * @plugindesc SRPGコンバータで敏捷が高い方が2回攻撃する仕様に変更します。
 * @author 神鏡学斗
 *
 * @param srpgAgilityAffectsRatio
 * @desc 敏捷性の差が2回攻撃の発生率に影響する比率です。
 * @default 2
 *
 * @param AAPwithYEP_BattleEngineCore
 * @desc YEP_BattleEngineCoreと併用する場合はtrueに設定してください。
 * @default false
 *
 * @help このプラグインには、プラグインコマンドはありません。
 * 
 * ＊SRPGコンバータ for MV Ver.1.12以上が必要です
 * 
 * 通常は敏捷が高い方から順に1回ずつ攻撃を行いますが、
 * このプラグインを導入すると攻撃側→防御側→敏捷の高い方の追加攻撃という順番で
 * 行動するようになります。
 * 味方や自分自身を対象とする行動は2回行動を行いません。
 * また、スキルのメモに<doubleAction:false>と記入すると2回行動しなくなります。
 * 
 * srpgAgilityAffectsRatioを変えることで2回攻撃の発生率を変えられます。
 * 「X倍以上で100%発生する」と設定し、その間は敏捷性の差に応じて確率が変わります。
 * srpgAgilityAffectsRatio : 1 → 敏捷性が1倍以上（同値以上）なら100%発生します。
 * srpgAgilityAffectsRatio : 2 → 敏捷性が2倍以上なら100%発生します。
 *  1.25倍なら25%、1.5倍なら50%です。
 * srpgAgilityAffectsRatio : 3 → 敏捷性が3倍以上なら100%発生します。
 *  1.5倍なら25%、2倍なら50%です。
 */

(function() {

    var parameters = PluginManager.parameters('SRPG_AgiAttackPlus');
    var _srpgAgilityAffectsRatio = Number(parameters['srpgAgilityAffectsRatio'] || 2);
    var _AAPwithYEP_BattleEngineCore = parameters['AAPwithYEP_BattleEngineCore'] || 'false';

//====================================================================
// ●Game_Action
//====================================================================
    var _SRPG_AAP_Game_Action_speed = Game_Action.prototype.speed;
    Game_Action.prototype.speed = function() {
        if ($gameSystem.isSRPGMode() == true) {
            return this.subject().agi;
        } else {
            return _SRPG_AAP_Game_Action_speed.call(this);
        }
    };

//====================================================================
// ●Game_Battler
//====================================================================
    var _SRPG_AAP_Game_Battler_initMembers = Game_Battler.prototype.initMembers;
    Game_Battler.prototype.initMembers = function() {
        _SRPG_AAP_Game_Battler_initMembers.call(this);
        this._reserveAction = null;
    };

    Game_Battler.prototype.reserveSameAction = function() {
        this._reserveAction = this._actions[0];
    };

    Game_Battler.prototype.addSameAction = function(agilityRate) {
        if (!this.currentAction() && this._reserveAction) {
            if (agilityRate > Math.randomInt(100)) {
                this._actions = this._actions.concat(this._reserveAction);
                var targets = this._actions[0].makeTargets();
                if (targets.length == 0) {
                    this._actions = [];
                }
            }
            this._reserveAction = null;
        }
    };

//====================================================================
// ●BattleManager
//====================================================================
    var _SRPG_AAP_BattleManager_initMembers = BattleManager.initMembers;
    BattleManager.initMembers = function() {
        _SRPG_AAP_BattleManager_initMembers.call(this);
        this._agilityRate = 0;
    };

    var _SRPG_AAP_BattleManager_makeActionOrders = BattleManager.makeActionOrders;
    BattleManager.makeActionOrders = function() {
        _SRPG_AAP_BattleManager_makeActionOrders.call(this);
        var battlers = this._actionBattlers;
        var firstBattler = battlers[0];
        if (!firstBattler.currentAction() || !firstBattler.currentAction().item()) {
            return;
        }
        if (firstBattler.currentAction().isForOpponent() &&
            !firstBattler.currentAction().item().meta.doubleAction) {
            var dif = battlers[0].agi - battlers[1].agi;
            var difMax = battlers[1].agi * _srpgAgilityAffectsRatio - battlers[1].agi;
            if (difMax == 0) {
                this._agilityRate = 100;
            } else {
                this._agilityRate = dif / difMax * 100;
            }
            firstBattler.reserveSameAction();
            battlers.sort(function(a, b) {
                return a.srpgActionTiming() - b.srpgActionTiming();
            });
            battlers.push(firstBattler);
            this._actionBattlers = battlers;
        }
    }

    var _SRPG_AAP_BattleManager_getNextSubject = BattleManager.getNextSubject;
    BattleManager.getNextSubject = function() {
        if (_AAPwithYEP_BattleEngineCore == 'false') {
            var battler = _SRPG_AAP_BattleManager_getNextSubject.call(this);
            if (battler) {
                battler.addSameAction(this._agilityRate);
            }
        } else {
            var battler = this.getNextSubjectWithYEP();
            if (battler) {
                battler.addSameAction(this._agilityRate);
            }
        }
        return battler;
    };

    BattleManager.getNextSubjectWithYEP = function() {
        for (;;) {
            var battler = this._actionBattlers.shift();
            if (!battler) {
                return null;
            }
            if (battler.isBattleMember() && battler.isAlive()) {
                return battler;
            }
        }
    };

})();
