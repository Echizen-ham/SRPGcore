//=============================================================================
// SRPG_core.js -SRPGコンバータMV-
// バージョン   : 1.32 + Q
// 最終更新日   : 2020/10/8
// 制作         : 神鏡学斗, Dr. Q
// 配布元       : http://www.lemon-slice.net/
// 制作協力 　　: アンチョビ様　
//                エビ様　http://www.zf.em-net.ne.jp/~ebi-games/
//                Tsumio様
//-----------------------------------------------------------------------------
// copyright 2017 - 2019 Lemon slice all rights reserved.
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc SRPG battle system (tactical battle system) on map.
 * @author Gakuto Mikagami, Dr. Q
 *
 * @param srpgTroopID
 * @desc SRPGconverter use this troop ID.
 * @type number
 * @min 1
 * @default 1
 *
 * @param srpgBattleSwitchID
 * @desc switch ID of 'in tactical battle' or 'not'. If using tactical battle system, this swith turn on。
 * @type switch
 * @default 1
 *
 * @param existActorVarID
 * @desc variable ID of 'exist actor'. Exist is not death state and hide。
 * @type variable
 * @default 1
 *
 * @param existEnemyVarID
 * @desc variable ID of 'exist enemy'. Exist is not death state and hide。
 * @type variable
 * @default 2
 *
 * @param turnVarID
 * @desc variable ID of 'srpg turn'. first turn is 'turn 1'。
 * @type variable
 * @default 3
 *
 * @param activeEventID
 * @desc variable ID of 'acting event ID'.
 * @type variable
 * @default 4
 *
 * @param targetEventID
 * @desc variable ID of 'target event ID'. not only attack but also heal or assist.
 * @type variable
 * @default 5
 *
 * @param maxActorVarID
 * @desc variable ID of the maximum number of actors participating in the battle. Set to 0 to disable.
 * @type variable
 * @default 0
 *
 * @param defaultMove
 * @desc use this parameter if you don't set move in class or enemy note.
 * @type number
 * @min 0
 * @default 4
 *
 * @param srpgBattleExpRate
 * @desc if player can't defeat enemy, player get exp in this rate. set 0 to 1.0.
 * @type number
 * @decimals 2
 * @min 0
 * @max 1
 * @default 0.4
 *
 * @param srpgBattleExpRateForActors
 * @desc if player act for friends,player get exp in this rate(to next level). set 0 to 1.0. 
 * @type number
 * @decimals 2
 * @min 0
 * @max 1
 * @default 0.1
 *
 * @param srpgBattleQuickLaunch
 * @desc true is quick the battle start effect.(true / false)
 * @type boolean
 * @default true
 *
 * @param srpgActorCommandEquip
 * @desc true is add command 'equip' in actor command.(true / false)
 * @type boolean
 * @default true
 *
 * @param srpgWinLoseConditionCommand
 * @desc true is add command 'Win / Lose Condetion' in menu command.(true / false)
 * @type boolean
 * @default true
 *
 * @param srpgBattleEndAllHeal
 * @desc all heal actors when tactical battle end.(true / false)
 * @type boolean
 * @default true
 *
 * @param srpgPredictionWindowMode
 * @desc Change the display of the battle prediction window. (1: full / 2: only attack name / 3: not displayed)
 * @type select
 * @option Full
 * @value 1
 * @option Only attack name
 * @value 2
 * @option Not displayed
 * @value 3
 * @default 1
 *
 * @param srpgAutoBattleStateId
 * @desc A state ID to be given when auto battle is selected. State is "automatic battle" & canceled 1 action(invalidated by 0).
 * @type state
 * @default 14
 *
 * @param srpgBestSearchRouteSize
 * @desc If there is no target can be attacked, the closest route is searched. This is a searchable distance(invalidated by 0).
 * @type number
 * @min 0
 * @default 20
 *
 * @param srpgDamageDirectionChange
 * @desc When attacked, correct the direction towards the attacker.(true / false)
 * @type boolean
 * @default true
 *
 * @param srpgSkipTargetForSelf
 * @desc For actions targeting oneself, skip the target selection process.(true / false)
 * @type boolean
 * @default true
 *
 * @param srpgRangeTerrainTag7
 * @desc Make the terrain tag 7 that does not pass the range.(true / false)
 * @type boolean
 * @default true
 *
 * @param WithYEP_BattleEngineCore
 * @desc Set true if you use YEP_BattleEngineCore.
 * @type boolean
 * @default false
 *
 * @param Use Map Battle
 * @desc Default Map Battle usage
 * @type select
 * @option Always
 * @value 3
 * @option When Config is On(default off)
 * @value 2
 * @option When Switch is On
 * @value 1
 * @option Never 
 * @value 0
 * @default 3
 *
 * @param Map Battle Switch
 * @parent Use Map Battle
 * @desc Switch that activates map battle
 * @type switch
 * @default 0
 *
 * @param Animation Delay(Map Battle)
 * @desc Frames between animation start and skill effect
 * Set to -1 to wait for all animations to finish
 * @type number
 * @min -1
 * @default 25
 *
 * @param useAgiAttackPlus
 * @desc Use the mechanism that the one with higher agility attacks twice.
 * @type boolean
 * @default true
 *
 * @param srpgAgilityAffectsRatio
 * @parent useAgiAttackPlus
 * @desc This is the ratio at which the difference in agility affects the probability of attack twice.
 * @type number
 * @min 1
 * @default 2
 *
 * @param enemyDefaultClass
 * @desc If you don't set class in enemy note, use this name.
 * @default Enemy
 *
 * @param textSrpgEquip
 * @desc Name of weapon. Used in SRPG state window.
 * @default Weapon
 *
 * @param textSrpgMove
 * @desc Name of move range. Used in SRPG state window.
 * @default Move
 *
 * @param textSrpgRange
 * @desc Name of attack range. Used in SRPG state window.
 * @default Range
 *
 * @param textSrpgWait
 * @desc Name of stand. Used in SRPG state window.
 * @default Stand
 *
 * @param textSrpgWinLoseCondition
 * @desc A term used to describe the win / loss conditions. It is displayed in the menu command window.
 * @default Win / loss conditions
 *
 * @param textSrpgWinCondition
 * @desc A term used to describe the win conditions. It is displayed in the win / loss conditions window.
 * @default Win conditions
 *
 * @param textSrpgLoseCondition
 * @desc A term used to describe the loss conditions. It is displayed in the win / loss conditions window.
 * @default Loss conditions
 *
 * @param textSrpgTurnEnd
 * @desc Name of turn end. Used in menu window.
 * @default Turn End
 *
 * @param textSrpgAutoBattle
 * @desc Name of auto battle. Used in menu window.
 * @default Auto Battle
 *
 * @param textSrpgDamage
 * @desc Name of damage in the prediction window.
 * @default Damage
 *
 * @param textSrpgHealing
 * @desc Name of healing in the prediction window.
 * @default Healing
 *
 * @param textSrpgNone
 * @desc Term for nothing equipped on a unit.
 * @default None
 *
 * @param srpgSet
 * @desc Spriteset for cursor and SRPG system icons
 * @type file
 * @dir img/characters/
 * @require 1
 * @default srpg_set
 *
 * @param rewardSound
 * @desc Sound effect for the reward window
 * @type file
 * @dir audio/se/
 * @require 1
 * @default Item3
 *
 * @param expSound
 * @desc Sound effect for the exp guage increasing
 * @type file
 * @dir audio/se/
 * @require 1
 * @default Up4
 * 
 * @noteParam characterName
 * @noteRequire 1
 * @noteDir img/characters/
 * @noteType file
 * @noteData enemies
 * 
 * @noteParam faceName
 * @noteRequire 1
 * @noteDir img/faces/
 * @noteType file
 * @noteData enemies
 *
 * @help
 *
 * Note:
 * Map movement(event command "Location move") during SRPG battle is not possible.
 * Go to the map for battle and use the plug-in command SRPGBattle Start.
 * Also, use the plugin command SRPGBattle End before moving to other map.
 * 
 * Plugins built in from Ver.1.30Q:
 * - SRPG_AgiAttackPlus
 * - SRPG_UncounterableAttack
 * - SRPGconverter_with_YEP_BattleEngineCore
 * 
 * The above plugins are already built into SRPG_core.js, so you don't need to install them again.
 * When using SRPG_AgiAttackPlus and SRPGconverter_with_YEP_BattleEngineCore, 
 * please turn on the function from the plug-in parameter.
 * 
 * plugin command:
 *   SRPGBattle Start   # start tactical battle.
 *   SRPGBattle End     # end tactical battle.
 *
 * event note:
 *   <type:actor>       # set this event to actor(use this note with <id:X>).
 *   <type:enemy>       # set this event to enemy(use this note with <id:X>).
 *   <id:X>             # set this event to ID X actor / enemy.
 *   <SearchItem:true>  # if the event is an actor, if there is a unit event, it will move to it preferentially (only once).
 *
 *   <mode:normal>      # set this unit's acting pattern 'normal'(if you don't set mode, set 'normal' automatically).
 *   <mode:stand>       # set this unit's acting pattern 'stand if enemy don't near by'.
 *   <mode:regionUp>    # set this unit's acting pattern 'go to bigger region ID if enemy don't near by'.
 *   <mode:regionDown>  # set this unit's acting pattern 'go to smaller region ID if enemy don't near by'.
 *   <mode:absRegionUp> # set this unit's acting pattern 'always go to bigger region ID'.
 *   <mode:absRegionDown># set this unit's acting pattern 'always go to smaller region ID'.
 *   <mode:aimingEvent> # set this unit's acting pattern 'aim for event with the specified ID'(use this note with <targetId:X>).
 *   <mode:aimingActor> # set this unit's acting pattern 'aim for actor with the specified ID'(use this note with <targetId:X>).
 *   <targetId:X>       # ID of target event or actor.
 *
 *   <type:unitEvent>   # set this event to event unit (event unit start when actor action or stand on it). 
 *   <type:playerEvent> # set this event to player event (player event start when player push enter key on it). 
 *   <type:object>      # set this event to object that pleyer and enemy can't move(except for event has no graphic).
 *   <type:battleStart> # start this event when only battle start.
 *   <type:actorTurn>   # start this event when actor turn start.
 *   <type:enemyTurn>   # start this event when enemy turn start.
 *   <type:turnEnd>     # start this event when turn end.
 *   <type:afterAction> # start this event when actor or enemy action.
 *
 * class's note:
 *   <srpgMove:X>       # set move range X.
 *   <srpgThroughTag:X> # unit can go through tiles with terrain tags less than X(except for terrain tag 0)
 *
 * skill or item's note:
 *   <srpgRange:X>      # set attack range X.
 *                      # when set 0, this skill targets user(set range 'user').
 *                      # when set -1, 'weaponRange' on weapon or enemy's note set to this attack range.
 *   <srpgMinRange:X>   # set attack minimum range X.
 *   <specialRange:X>   # specialize the shape of the range (eg <specialRange:queen>).
 *                      # queen: 8 directions, luke: straight, bishop: diagonal, knight: other than 8 directions,
 *                      # king: square
 *   <addActionTimes: X># Increases the number of actions by X when the skill is used. If set to 1, the skill can re-act after the action.
 *                      # It is recommended to combine with <notUseAfterMove> below because unit can move many times.
 *   <notUseAfterMove>  # The skill cannot be used after moving.
 * 　<Cast Animation: 0># If you don't display cast animation, you write it (with YEP_BattleEngineCore.js).
 *
 * weapon's note:
 *   <weaponRange:X>    # set attack range X.
 *   <weaponMinRange:X> # set attack minimum range X.
 *   <srpgWeaponSkill:X># set attack skill ID X. normal attack is skill ID 1.
 *   <srpgCounter:false># set this weapon can't counter attack.
 *   <srpgMovePlus:X>   # change move range X. you can set minus value.
 *   <srpgThroughTag:X> # unit can go through tiles with terrain tags less than X(except for terrain tag 0)
 *
 * armor's note:
 *   <srpgMovePlus:X>   # change move range X. you can set minus value.
 *   <srpgWRangePlus:X> # change normal attack range X. you can set minus value.
 *   <srpgThroughTag:X> # unit can go through tiles with terrain tags less than X(except for terrain tag 0)
 *
 * enemy's note:
 *   <characterName:X>  # set charactor graphic's file name to X.
 *   <characterIndex:X> # set id in charactor graphic to X.
 *                      # id is 0 1 2 3
 *                      #       4 5 6 7
 *   <faceName:X>       # set face graphic's file name to X.
 *   <faceIndex:X>      # set id in face graphic to X.
 *                      # id is 0 1 2 3
 *                      #       4 5 6 7
 *   <srpgClass:X>      # set class name in SRPG status window. this name is dummy.
 *   <srpgLevel:X>      # set level in SRPG status window. this level is dummy.
 *   <srpgMove:X>       # set this enemy's move range.
 *   <weaponRange:X>    # set this enemy's attack range(when you don't set srpgWeapon).
 *   <weaponMinRange:X> # set this enemy's attack minimum range(when you don't set srpgWeapon).
 *   <srpgWeapon:X>     # set this enemy's weapon. X is weapon id. this is NOT dummy.
 *   <srpgThroughTag:X> # unit can go through tiles with terrain tags less than X(except for terrain tag 0)
 *
 * state's note:
 *   <srpgMovePlus:X>   # change move range X.you can set minus value.
 *   <srpgWRangePlus:X> # change normal attack range X. you can set minus value.
 *   <srpgThroughTag:X> # unit can go through tiles with terrain tags less than X(except for terrain tag 0)
 *
 * Event command => script:
 *   this.EventDistance(VariableID, EventID, EventID); # Store the distance between events in a variable.
 *   this.ActorDistance(VariableID, ActorID, ActorID); # Store the distance between actors in a variable.
 *   this.playerMoveTo(X, Y);            # Move the cursor (player) to the coordinates (X, Y).
 *   this.addActor(EventID, ActorID);    # Make the event with the specified ID the actor.
 *   this.addEnemy(EventID, EnemyID);    # Make the event with the specified ID the enemy.
 *   this.setBattleMode(EventID, 'mode');# Change the acting pattern of the event with the specified ID.
 *   this.setTargetId(EventID, ID);      # Change the target ID of the event with the specified ID.
 *   this.fromActorMinimumDistance(VariableID, EventID); # Stores the distance between the specified event and the nearest actor
 *                                                       # among all actors in the variable.
 *   this.isUnitDead(SwitchID, EventID); # Stores in the switch whether the event with the specified ID is dead or not.
 *   this.isEventIdXy(VariableID, X, Y); # Stores the event ID of the specified coordinates (X, Y) in the variable.
 *   this.checkRegionId(switcheID, regionID); # Stores in the switch whether an actor is on the specified region ID.
 *   this.unitRecoverAll(EventID);       # Full recovery of the unit with the specified event ID (only when it is alive).
 *   this.unitRevive(EventID);           # Revive of the unit with the specified event ID (only when it is dead).
 *   this.unitAddState(EventId, StateId);# Add the state of the ID specified to the unit with the specified event ID.
 *   this.turnEnd();                     # End player's turn(Same 'Turn End' in menu).
 *   this.isSubPhaseNormal(SwitchID);    # Whether the player selects the unit to be operated (ON is the same as when the menu can be opened). 
 *   $gameSystem.clearSrpgWinLoseCondition();    # Reset the win / loss conditions. Execute before setting a new condition.
 *   $gameSystem.setSrpgWinCondition('text');    # Set win conditions. If you want to describe multiple conditions, execute it multiple times.
 *   $gameSystem.setSrpgLoseCondition('text');   # Set lose conditions. If you want to describe multiple conditions, execute it multiple times.
 *
 * Dr. Q's modifications:
 * - new windows, sprites, etc. are made available to extension plugins
 * - end-of-turn / stunned / auto indicators disappear when you leave srpg mode
 * - erased events won't turn into invisible, untargetable enemies / actors
 * - if the prediction window is disabled, selecting an invalid target won't skip your turn
 * - move / range squares go under sprites instead of over top of them
 * - fixed the name of the 'rook' special range, but 'luke' still works if you want
 * - added parameters for the previously unchangable text, sounds, and sprites
 * - updated to support the fancy MV plugin parameters, for easier configuration
 * - never turn around when targeting yourself
 *
 * == Map Battle ==============================================================
 *
 * Runs SRPG combat on the map. May be incompatible with other battle system 
 * plugins.
 *
 * In lunatic mode tags, script calls, or damage formulas, .event()
 * gets the event associated with that unit on the map, if you want
 * to manipulate it (movement, change appearance, etc).
 *
 * /!\ IMPORTANT /!\
 * Some plugins and mechanics can work differently between the Map Battle and
 * normal battles, especially if you use action sequences. Anything that can be
 * used in both, such as counter attacks, should be thoroughly tested to ensure
 * its works the same.
 * In lunatic mode tags or formulas, $gameSystem.useMapBattle() returns true if
 * the skill is being run on the map, instead of in the battle scene.
 *
 * New skill / item tags:
 * <mapBattle:true>     always uses this skill on the map
 * <mapBattle:false>    never uses this skill on the map
 * <targetAnimation:X>  shows animation X on the target cell
 * <animationDelay:X>   waits X frames between the animation and effect
 *                      overrides the default settings
 * <animationDelay:-1>  waits for animations to finish before the effect
 *
 * <directionalAnimation:X> shows an animation on the target cell based on
 * the direction the user is facing, following the usual direction order.
 * For example, <directionalAnimation:20> will show the following:
 * Animation 20 when facing down
 * Animation 21 when facing left
 * Animation 22 when facing right
 * Animation 23 when facing up
 *
 * == Agi Attack plus ==============================================================
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
 * 
 */

/*:ja
 * @plugindesc マップ上でSRPG（タクティクス）方式の戦闘を実行します。
 * @author 神鏡学斗
 *
 * @param srpgTroopID
 * @desc SRPGコンバータが占有するトループIDです。SRPG戦闘では、このIDのトループが使用されます。
 * @type number
 * @min 1
 * @default 1
 *
 * @param srpgBattleSwitchID
 * @desc SRPG戦闘中であるかを格納するスイッチのＩＤを指定します。戦闘中はONになります。
 * @type switch
 * @default 1
 *
 * @param existActorVarID
 * @desc 存在しているアクターの人数が代入される変数のＩＤを指定します。存在している＝戦闘不能・隠れでない。
 * @type variable
 * @default 1
 *
 * @param existEnemyVarID
 * @desc 存在しているエネミーの人数が代入される変数のＩＤを指定します。存在している＝戦闘不能・隠れでない。
 * @type variable
 * @default 2
 *
 * @param turnVarID
 * @desc 経過ターン数が代入される変数のＩＤを指定します。最初のターンは『ターン１』です。
 * @type variable
 * @default 3
 *
 * @param activeEventID
 * @desc 行動中のユニットのイベントＩＤが代入される変数のＩＤを指定します。
 * @type variable
 * @default 4
 *
 * @param targetEventID
 * @desc 攻撃対象のユニットのイベントＩＤが代入される変数のＩＤを指定します。回復や補助も含みます。
 * @type variable
 * @default 5
 *
 * @param maxActorVarID
 * @desc 戦闘に参加するアクターの最大数を設定する変数のIDを指定します。０で無効。
 * @type variable
 * @default 0
 *
 * @param defaultMove
 * @desc クラスやエネミーのメモで移動力が設定されていない場合、この値が適用されます。
 * @type number
 * @min 0
 * @default 4
 *
 * @param srpgBattleExpRate
 * @desc 敵を倒さなかった時に、設定された経験値の何割を入手するか。0 ～ 1.0で設定。
 * @type number
 * @decimals 2
 * @min 0
 * @max 1
 * @default 0.4
 *
 * @param srpgBattleExpRateForActors
 * @desc 味方に対して行動した時に、レベルアップに必要な経験値の何割を入手するか。0 ～ 1.0で設定。
 * @type number
 * @decimals 2
 * @min 0
 * @max 1
 * @default 0.1
 *
 * @param srpgBattleQuickLaunch
 * @desc 戦闘開始エフェクトを高速化します。falseだと通常と同じになります。(true / false)
 * @type boolean
 * @default true
 *
 * @param srpgActorCommandEquip
 * @desc アクターコマンドに『装備』を追加します。(true / false)
 * @type boolean
 * @default true
 *
 * @param srpgWinLoseConditionCommand
 * @desc メニューコマンドに『勝敗条件』を追加します。(true / false)
 * @type boolean
 * @default true
 *
 * @param srpgBattleEndAllHeal
 * @desc 戦闘終了後に自動的に味方全員を全回復します。falseだと自動回復しません。(true / false)
 * @type boolean
 * @default true
 *
 * @param srpgPredictionWindowMode
 * @desc 戦闘予測ウィンドウの表示を変更します。(1:フル / 2:攻撃名のみ / 3:表示なし)
 * @type select
 * @option フル
 * @value 1
 * @option 攻撃名のみ
 * @value 2
 * @option 表示なし
 * @value 3
 * @default 1
 *
 * @param srpgAutoBattleStateId
 * @desc オート戦闘が選ばれた時に付与するステートのIDです。1行動で解除・自動戦闘のステートを使います(0で無効化)。
 * @type state
 * @default 14
 *
 * @param srpgBestSearchRouteSize
 * @desc 攻撃可能な対象がいない時、最も近い敵までのルートを探索します。その索敵距離です（0で無効化）。
 * @type number
 * @min 0
 * @default 20
 *
 * @param srpgDamageDirectionChange
 * @desc 攻撃を受けた際に相手の方へ向きを補正します。(true / false)
 * @type boolean
 * @default true
 *
 * @param srpgSkipTargetForSelf
 * @desc 自分自身を対象とする行動では対象選択の処理をスキップします。(true / false)
 * @type boolean
 * @default true
 *
 * @param srpgRangeTerrainTag7
 * @desc 地形タグ７を射程が通らないタイルにします。(true / false)
 * @type boolean
 * @default true
 *
 * @param WithYEP_BattleEngineCore
 * @desc YEP_BattleEngineCoreと併用する場合はtrueに設定してください。
 * @type boolean
 * @default false
 * 
 * @param Use Map Battle
 * @desc マップバトルを使用するかどうか
 * @type select
 * @option Always
 * @value 3
 * @option When Config is On(default off)
 * @value 2
 * @option When Switch is On
 * @value 1
 * @option Never 
 * @value 0
 * @default 3
 *
 * @param Map Battle Switch
 * @parent Use Map Battle
 * @desc マップバトルを使用するか決定するスイッチのIDです（Use Map Battleが１の時）
 * @type switch
 * @default 0
 *
 * @param Animation Delay(Map Battle)
 * @desc アニメーション開始とスキル効果の表示までの待ち時間
 * -1に設定すると、アニメーションが完了するまで待つ
 * @type number
 * @min -1
 * @default 25
 * 
 * @param useAgiAttackPlus
 * @desc 敏捷が高い方が２回攻撃する仕組みを使用します。
 * @type boolean
 * @default false
 *
 * @param srpgAgilityAffectsRatio
 * @parent useAgiAttackPlus
 * @desc 敏捷性の差が2回攻撃の発生率に影響する比率です。
 * @type number
 * @min 1
 * @default 2
 *
 * @param enemyDefaultClass
 * @desc エネミーに職業（srpgClass）が設定されていない場合、ここの名前が表示されます。
 * @default エネミー
 *
 * @param textSrpgEquip
 * @desc 装備（武器）を表す用語です。ＳＲＰＧのステータスウィンドウで表示されます。
 * @default 装備
 *
 * @param textSrpgMove
 * @desc 移動力を表す用語です。ＳＲＰＧのステータスウィンドウで表示されます。
 * @default 移動力
 *
 * @param textSrpgRange
 * @desc 攻撃射程を表す用語です。ＳＲＰＧのステータスウィンドウで表示されます。
 * @default 射程
 *
 * @param textSrpgWait
 * @desc 待機を表す用語です。アクターコマンドウィンドウで表示されます。
 * @default 待機
 *
 * @param textSrpgWinLoseCondition
 * @desc 勝敗条件を表す用語です。メニューコマンドウィンドウで表示されます。
 * @default 勝敗条件
 *
 * @param textSrpgWinCondition
 * @desc 勝利条件を表す用語です。勝敗条件ウィンドウで表示されます。
 * @default 勝利条件
 *
 * @param textSrpgLoseCondition
 * @desc 敗北条件を表す用語です。勝敗条件ウィンドウで表示されます。
 * @default 敗北条件
 *
 * @param textSrpgTurnEnd
 * @desc ターン終了を表す用語です。メニュー画面で表示されます。
 * @default ターン終了
 *
 * @param textSrpgAutoBattle
 * @desc オート戦闘を表す用語です。メニュー画面で表示されます。
 * @default オート戦闘
 *
 * @param textSrpgDamage
 * @desc 戦闘予測ウィンドウで表示するダメージの用語
 * @default ダメージ
 *
 * @param textSrpgHealing
 * @desc 戦闘予測ウィンドウで表示する回復の用語
 * @default 回復
 *
 * @param textSrpgNone
 * @desc 装備が無い時に表示される用語
 * @default なし
 *
 * @param srpgSet
 * @desc SRPG戦闘で使うカーソルなどのキャラクター画像のファイル名
 * @type file
 * @dir img/characters/
 * @require 1
 * @default srpg_set
 *
 * @param rewardSound
 * @desc リザルトウィンドウで使用する効果音のファイル名
 * @type file
 * @dir audio/se/
 * @require 1
 * @default Item3
 *
 * @param expSound
 * @desc リザルトウィンドウでレベルアップ時に使用する効果音のファイル名
 * @type file
 * @dir audio/se/
 * @require 1
 * @default Up4
 * 
 * @noteParam characterName
 * @noteRequire 1
 * @noteDir img/characters/
 * @noteType file
 * @noteData enemies
 * 
 * @noteParam faceName
 * @noteRequire 1
 * @noteDir img/faces/
 * @noteType file
 * @noteData enemies
 *
 * @help
 *
 * 注意
 * 　SRPG戦闘中のマップ移動（イベントコマンド『場所移動』）はできません。
 * 　戦闘用のマップに移動してから、プラグインコマンド SRPGBattle Startを使用してください。
 *   また、プラグインコマンド SRPGBattle Endを使用してから、他のマップに移動してください。
 * 
 * Ver.1.30Q から組み込まれたプラグイン:
 * - SRPG_AgiAttackPlus
 * - SRPG_UncounterableAttack
 * - SRPGconverter_with_YEP_BattleEngineCore
 * 
 * 上記のプラグインは、既にSRPG_core.js本体に組み込まれているため、
 * 改めて導入する必要はありません。
 * SRPG_AgiAttackPlus、SRPGconverter_with_YEP_BattleEngineCoreを使用する際は
 * プラグインパラメータからONにしてください。
 *
 * プラグインコマンド:
 *   SRPGBattle Start   # SRPG戦闘を開始する。
 *   SRPGBattle End     # SRPG戦闘を終了する。
 *
 * イベントのメモ欄:
 *   <type:actor>       # そのイベントはアクターになります(<id:X>を組み合わせて使います)。
 *   <type:enemy>       # そのイベントはエネミーになります(<id:X>を組み合わせて使います)。
 *   <id:X>             # そのイベントはXで指定したIDのアクター／エネミーになります(Xは半角数字）。
 *   <SearchItem:true>  # そのイベントがアクターの場合、ユニットイベントがある場合は優先してそこに移動するようになります（1度だけ）。
 *
 *   <mode:normal>      # そのユニットの行動パターンを「通常」に設定します（設定しない場合、自動で「通常」になります）。
 *   <mode:stand>       # そのユニットの行動パターンを「相手が近づくまで待機」に設定します。
 *   <mode:regionUp>    # そのユニットの行動パターンを「相手が近づくまでより大きなリージョンＩＤに向かう」に設定します。
 *   <mode:regionDown>  # そのユニットの行動パターンを「相手が近づくまでより小さなリージョンＩＤに向かう」に設定します。
 *   <mode:absRegionUp> # そのユニットの行動パターンを「常により大きなリージョンＩＤに向かう」に設定します。
 *   <mode:absRegionDown># そのユニットの行動パターンを「常により小さなリージョンＩＤに向かう」に設定します。
 *   <mode:aimingEvent> # そのユニットの行動パターンを「指定したＩＤのイベントを狙う」に設定します（<targetId:X>を組み合わせて使います）。
 *   <mode:aimingActor> # そのユニットの行動パターンを「指定したＩＤのアクターを狙う」に設定します（<targetId:X>を組み合わせて使います）。
 *   <targetId:X>       # 指定したＩＤのイベント/アクターを狙います。
 *
 *   <type:unitEvent>   # そのイベントはアクターがその上で行動・待機した時に起動するようになります。
 *   <type:playerEvent> # そのイベントはプレイヤー（カーソル）で決定キーを押したときに起動します。通過できますが待機は出来ません。
 *   <type:object>      # そのイベントはアクターもエネミーも通行できない障害物になります（画像が無い場合は通行可能）。
 *   <type:battleStart> # そのイベントは戦闘開始時に一度だけ自動で実行されます。
 *   <type:actorTurn>   # そのイベントはアクターターンの開始時に自動で実行されます。
 *   <type:enemyTurn>   # そのイベントはエネミーターンの開始時に自動で実行されます。
 *   <type:turnEnd>     # そのイベントはターン終了時に自動で実行されます。
 *   <type:afterAction> # そのイベントはアクター・エネミーの行動終了時に自動で実行されます。
 *
 * 職業のメモ欄:
 *   <srpgMove:X>       # その職業のアクターの移動力をXに設定します。
 *   <srpgThroughTag:X> # X以下の地形タグが設定されたタイルを通過できます（地形タグ 0 には無効）。
 *
 * スキル・アイテムのメモ欄:
 *   <srpgRange:X>      # そのスキルの射程をXに設定します。
 *                      # srpgRangeを 0 に設定すると自分自身を対象にするスキルになります（範囲は「使用者」にしてください）。
 *                      # srpgRangeを -1 に設定すると武器・エネミーのメモの<weaponRange>が適用されます。
 *   <srpgMinRange:X>   # そのスキルの最低射程をXに設定します。
 *   <specialRange:X>   # 射程の形状を特殊化します（例：<specialRange:queen>）。
 *                      # queen：8方向、luke：直線、bishop：斜め、knight：8方向以外、king：四角
 *   <addActionTimes: X># スキル発動時に行動回数を +X します。1 にすると行動後に再行動できるスキルになります。
 *                      # そのままだと何度も移動できてしまうため、下記の<notUseAfterMove>と組み合わせることを推奨します。
 *   <notUseAfterMove>  # 移動後は使用できないスキルになります。
 * 　<Cast Animation: 0># スキル使用時アニメを表示したくない場合、このように書いてください（YEP_BattleEngineCore.js併用時）。
 *
 * 武器のメモ欄:
 *   <weaponRange:X>    # その武器の射程をXに設定します。
 *   <weaponMinRange:X> # その武器の最低射程をXに設定します。
 *   <srpgWeaponSkill:X># 攻撃時に、通常攻撃（スキルID 1）ではなく、Xで設定したＩＤのスキルを発動する武器になります。
 *   <srpgCounter:false># 設定すると、相手からの攻撃に対して反撃しない武器になります（反撃率とは異なる）。
 *   <srpgMovePlus:X>   # Xの分だけ移動力を変化させます。マイナスの値も設定可能です。
 *   <srpgThroughTag:X> # X以下の地形タグが設定されたタイルを通過できます（地形タグ 0 には無効）。
 *
 * 防具のメモ欄:
 *   <srpgMovePlus:X>   # Xの分だけ移動力を変化させます。マイナスの値も設定可能です。
 *   <srpgWRangePlus:X> # Xの分だけ通常攻撃の攻撃射程を変化させます。マイナスの値も設定可能です。
 *   <srpgThroughTag:X> # X以下の地形タグが設定されたタイルを通過できます（地形タグ 0 には無効）。
 *
 * エネミーのメモ欄:
 *   <characterName:X>  # XにSRPG戦闘中に使用するキャラクターグラフィックのファイル名を入力します。
 *   <characterIndex:X> # XにSRPG戦闘中に使用するキャラクターグラフィックの何番を使うか入力します。
 *                      # 画像ファイルの位置で、 0 1 2 3
 *                      #                        4 5 6 7　となっています。
 *   <faceName:X>       # XにSRPG戦闘中に使用する顔グラフィックのファイル名を入力します。
 *   <faceIndex:X>      # XにSRPG戦闘中に使用する顔グラフィックの何番を使うか入力します（番号は上記と同様）。
 *   <srpgClass:X>      # XにSRPGのステータス画面で表示するクラス名を入力します（実際には影響しません）。
 *   <srpgLevel:X>      # XにSRPGのステータス画面で表示するレベルを入力します（実際には影響しません）。
 *   <srpgMove:X>       # そのエネミーの移動力をXに設定します。
 *   <weaponRange:X>    # そのエネミーの通常攻撃の射程距離をXに設定します（装備武器未設定時）。
 *   <weaponMinRange:X> # そのエネミーの通常攻撃の最低射程をXに設定します（装備武器未設定時）。
 *   <srpgWeapon:X>     # そのエネミーが装備する武器のＩＤをXに設定します（能力に影響します）。
 *   <srpgThroughTag:X> # X以下の地形タグが設定されたタイルを通過できます（地形タグ 0 には無効）。
 *
 * ステートのメモ欄:
 *   <srpgMovePlus:X>   # そのステートの間、Xの分だけ移動力を変化させます。マイナスの値も設定可能です。
 *   <srpgWRangePlus:X> # Xの分だけ通常攻撃の攻撃射程を変化させます。マイナスの値も設定可能です。
 *   <srpgThroughTag:X> # X以下の地形タグが設定されたタイルを通過できます（地形タグ 0 には無効）。
 *
 * イベントコマンド => スクリプト:
 *   this.EventDistance(VariableID, EventID, EventID); # 指定したＩＤのイベント間の距離を変数に格納します。
 *   this.ActorDistance(VariableID, ActorID, ActorID); # 指定したＩＤのアクター間の距離を変数に格納します。
 *   this.playerMoveTo(X, Y);            # カーソル（プレイヤー）を座標(X,Y)に移動させます。
 *   this.addActor(EventID, ActorID);    # 指定したＩＤのイベントをアクターにします。
 *   this.addEnemy(EventID, EnemyID);    # 指定したＩＤのイベントをエネミーにします。
 *   this.setBattleMode(EventID, 'mode');# 指定したＩＤのイベントの行動パターンを変更します。
 *   this.setTargetId(EventID, ID);      # 指定したＩＤのイベントのターゲットＩＤを変更します。
 *   this.fromActorMinimumDistance(VariableID, EventID); # 指定したイベントと全てのアクターの中で
 *                                                       # 最も近いアクターとの距離を変数に格納します。
 *   this.isUnitDead(SwitchID, EventID); # 指定したＩＤのイベントが戦闘不能かどうかをスイッチに格納します。
 *   this.isEventIdXy(VariableID, X, Y); # 指定した座標(X, Y)のイベントＩＤを変数に格納します。
 *   this.checkRegionId(switcheID, regionID); # 指定したリージョンID上にアクターがいるか判定してスイッチに格納します。
 *   this.unitRecoverAll(EventID);       # 指定したイベントＩＤのユニットを全回復します（生存している時のみ）。
 *   this.unitRevive(EventID);           # 指定したイベントＩＤのユニットを復活します（戦闘不能時のみ）。
 *   this.unitAddState(EventId, StateId);# 指定したイベントＩＤのユニットに指定したＩＤのステートを付与します。
 *   this.turnEnd();                     # プレイヤーのターンを終了します（メニューの「ターン終了」と同じ機能）
 *   this.isSubPhaseNormal(SwitchID);    # 操作するユニットを選択する状態かをスイッチに格納します（ONだとメニューが開ける状態と同じ）。
 *   $gameSystem.clearSrpgWinLoseCondition();    # 勝敗条件をリセットします。新しい条件を設定する前に実行してください。
 *   $gameSystem.setSrpgWinCondition('text');    # 勝利条件をセットします（textに文字列）。複数の条件を記述する場合は、複数回実行してください。
 *   $gameSystem.setSrpgLoseCondition('text');   # 敗北条件をセットします（textに文字列）。複数の条件を記述する場合は、複数回実行してください。
 *
 *
 * == マップバトル ======================================================================
 *
 * 『Use Map Battle』を切り替えると、マップ上で戦闘を行うようにできます。
 * 他の戦闘関係のプラグインとは互換性が無い可能性があります（SRPGコンバータ関係を含む）。
 *
 * 上級者向け：イベントに対して処理を行う場合（移動や表示、アニメーション、
 * スクリプト呼び出し、ダメージ計算、etc...）、.event() を用いることで
 * そのユニットが設定されているイベントを呼び出すことが出来ます。
 *
 * /!\ 重要 /!\
 * 一部のプラグインとメカニズムでは、特にアクションシーケンスを使用する場合、
 * マップバトルと通常のバトルで異なる動作をする可能性があります。
 * カウンターアタックなど、両方で使用できるものは、すべて徹底的にテストして
 * 同じように機能することを確認する必要があります。
 * 上級者向け：タグや計算式を用いる際、もしスキルがマップバトルとして使われている場合、
 * $gameSystem.useMapBattle()は true を返します。
 *
 * 新規のスキル・アイテムのメモ欄:
 * <mapBattle:true>     このスキルは、常にマップ上で使われるようになります。
 * <mapBattle:false>    このスキルは、マップ上で使われなくなります（通常の戦闘）。
 * <targetAnimation:X>  ターゲットのイベントにID Xのアニメーションを実行します。
 * <animationDelay:X>   アニメーション開始と効果実施の間の待ち時間です。
 *                      デフォルト設定より優先されます。
 * <animationDelay:-1>  アニメーションが終了するまで、効果実施を待ちます。
 *
 * <directionalAnimation:X> ターゲットに表示するアニメーションを使用者の向きによって変更します。
 * アニメーションIDは順番に設定されます.
 * 例, <directionalAnimation:20> と設定した場合:
 * 下向きの時　Animation 20
 * 左向きの時　Animation 21
 * 右向きの時　Animation 22
 * 上向きの時　Animation 23
 *
 * == 敏捷が高い方が２回攻撃（AgiAttackPlus） ====================================
 *
 * 通常は敏捷が高い方から順に1回ずつ攻撃を行いますが、
 * このプラグインオンにすると攻撃側→防御側→敏捷の高い方の追加攻撃という順番で
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

    var parameters = PluginManager.parameters('SRPG_core');
    var _srpgTroopID = Number(parameters['srpgTroopID'] || 1);
    var _srpgBattleSwitchID = Number(parameters['srpgBattleSwitchID'] || 1);
    var _existActorVarID = Number(parameters['existActorVarID'] || 1);
    var _existEnemyVarID = Number(parameters['existEnemyVarID'] || 2);
    var _turnVarID = Number(parameters['turnVarID'] || 3);
    var _activeEventID = Number(parameters['activeEventID'] || 4);
    var _targetEventID = Number(parameters['targetEventID'] || 5);
    var _maxActorVarID = Number(parameters['maxActorVarID'] || 0);
    var _defaultMove = Number(parameters['defaultMove'] || 4);
    var _srpgBattleExpRate = Number(parameters['srpgBattleExpRate'] || 0.4);
    var _srpgBattleExpRateForActors = Number(parameters['srpgBattleExpRateForActors'] || 0.1);
    var _enemyDefaultClass = parameters['enemyDefaultClass'] || 'エネミー';
    var _textSrpgEquip = parameters['textSrpgEquip'] || '装備';
    var _textSrpgMove = parameters['textSrpgMove'] || '移動力';
    var _textSrpgRange = parameters['textSrpgRange'] || '射程';
    var _textSrpgWait = parameters['textSrpgWait'] || '待機';
    var _textSrpgTurnEnd = parameters['textSrpgTurnEnd'] || 'ターン終了';
    var _textSrpgAutoBattle = parameters['textSrpgAutoBattle'] || 'オート戦闘';
    var _srpgBattleQuickLaunch = parameters['srpgBattleQuickLaunch'] || 'true';
    var _srpgActorCommandEquip = parameters['srpgActorCommandEquip'] || 'true';
    var _srpgBattleEndAllHeal = parameters['srpgBattleEndAllHeal'] || 'true';
    var _srpgStandUnitSkip = 'true';
    var _srpgPredictionWindowMode = Number(parameters['srpgPredictionWindowMode'] || 1);
    var _srpgAutoBattleStateId = Number(parameters['srpgAutoBattleStateId'] || 14);
    var _srpgBestSearchRouteSize = Number(parameters['srpgBestSearchRouteSize'] || 20);
    var _srpgDamageDirectionChange = parameters['srpgDamageDirectionChange'] || 'true';
    var _srpgWinLoseConditionCommand = parameters['srpgWinLoseConditionCommand'] || 'true';
    var _textSrpgWinLoseCondition = parameters['textSrpgWinLoseCondition'] || '勝敗条件';
    var _textSrpgWinCondition = parameters['textSrpgWinCondition'] || '勝利条件';
    var _textSrpgLoseCondition = parameters['textSrpgLoseCondition'] || '敗北条件';
    var _srpgSkipTargetForSelf = parameters['srpgSkipTargetForSelf'] || 'true';
    var _srpgRangeTerrainTag7 = parameters['srpgRangeTerrainTag7'] || 'true';
    var _textSrpgDamage = parameters['textSrpgDamage'] || 'ダメージ';
    var _textSrpgHealing = parameters['textSrpgHealing'] || '回復';
    var _textSrpgNone = parameters['textSrpgNone'] || 'なし';
    var _srpgSet = parameters['srpgSet'] || 'srpg_set';
    var _rewardSe = parameters['rewardSound'] || 'Item3';
    var _expSe = parameters['expSound'] || 'Up4';
    var _useMapBattle = Number(parameters['Use Map Battle'] || 3);
    var _mapBattleSwitch = Number(parameters['Map Battle Switch'] || 0);
    var _animDelay = Number(parameters['Animation Delay'] || -1);
    var _srpgUseAgiAttackPlus = parameters['useAgiAttackPlus'] || 'true';
    var _srpgAgilityAffectsRatio = Number(parameters['srpgAgilityAffectsRatio'] || 2);
    var _AAPwithYEP_BattleEngineCore = parameters['WithYEP_BattleEngineCore'] || 'false';

    var _Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'SRPGBattle') {
            switch (args[0]) {
            case 'Start':
                $gameSystem.startSRPG();
                break;
            case 'End':
                $gameSystem.endSRPG();
                break;
            }
        }
    };

//====================================================================
// ●Game_Temp
//====================================================================
    //初期化処理
    var _SRPG_Game_Temp_initialize = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function() {
    _SRPG_Game_Temp_initialize.call(this);
    this._MoveTable = [];
    this._MoveList = [];
    this._RangeTable = [];
    this._RangeList = [];
    this._ResetMoveList = false;
    this._SrpgDistance = 0;
    this._ActiveEvent = null;
    this._TargetEvent = null;
    this._OriginalPos = [];
    this._SrpgEventList = [];
    this._autoMoveDestinationValid = false;
    this._autoMoveDestinationX = -1;
    this._autoMoveDestinationY = -1;
    this._srpgLoadFlag = false;
    this._srpgActorEquipFlag = false;
    this._SrpgTurnEndFlag = false;
    this._srpgBestSearchFlag = false;
    this._srpgBestSearchRoute = [null, [], ''];
    this._srpgPriorityTarget = null;
    };

    //移動範囲と移動経路を記録する配列変数を返す
    Game_Temp.prototype.MoveTable = function(x, y) {
        return this._MoveTable[x][y];
    };

    //移動範囲を設定する
    Game_Temp.prototype.setMoveTable = function(x, y, move, route) {
        this._MoveTable[x][y] = [move, route];
    };

    //攻撃射程と計算経路を記録する配列変数を返す
    Game_Temp.prototype.RangeTable = function(x, y) {
        return this._RangeTable[x][y];
    };

    //攻撃射程を設定する
    Game_Temp.prototype.setRangeTable = function(x, y, move, route) {
        this._RangeTable[x][y] = [move, route];
    };

    //移動可能な座標のリストを返す(移動範囲表示で使用)
    Game_Temp.prototype.moveList = function() {
        return this._MoveList;
    };

    //移動可能な座標のリストに追加する
    Game_Temp.prototype.pushMoveList = function(xy) {
        this._MoveList.push(xy);
    };

    //座標リストにデータが入っているか返す
    Game_Temp.prototype.isMoveListValid = function() {
        return this._MoveList.length > 0;
    };

    //攻撃可能な座標のリストを返す(攻撃射程表示で使用)
    Game_Temp.prototype.rangeList = function() {
        return this._RangeList;
    };

    //攻撃可能な座標のリストに追加する
    Game_Temp.prototype.pushRangeList = function(xy) {
        this._RangeList.push(xy);
    };

    //移動範囲の配列に射程範囲の配列を結合する
    Game_Temp.prototype.pushRangeListToMoveList = function(array) {
        Array.prototype.push.apply(this._MoveList, this._RangeList);
    };

    //射程範囲から最低射程を除く
    Game_Temp.prototype.minRangeAdapt = function(oriX, oriY, minRange) {
        var newList = [];
        for (var i = 0; i < this._RangeList.length; i++) {
            var x = this._RangeList[i][0];
            var y = this._RangeList[i][1];
            var dis = Math.abs(x - oriX) + Math.abs(y - oriY);
            if (dis >= minRange) {
                newList.push(this._RangeList[i]);
            }
        }
        this._RangeList = [];
        this._RangeList = newList;
    };

    //移動範囲を初期化する
    Game_Temp.prototype.clearMoveTable = function() {
        this._MoveTable = [];
        this._MoveList = [];
        for (var i = 0; i < $dataMap.width; i++) {
          var vartical = [];
          for (var j = 0; j < $dataMap.height; j++) {
            vartical[j] = [-1, []];
          }
          this._MoveTable[i] = vartical;
        }
        this._RangeTable = [];
        this._RangeList = [];
        for (var i = 0; i < $dataMap.width; i++) {
          var vartical = [];
          for (var j = 0; j < $dataMap.height; j++) {
            vartical[j] = [-1, []];
          }
          this._RangeTable[i] = vartical;
        }
    };

    //移動範囲のスプライト消去のフラグを返す
    Game_Temp.prototype.resetMoveList = function() {
        return this._ResetMoveList;
    };

    //移動範囲のスプライト消去のフラグを設定する
    Game_Temp.prototype.setResetMoveList = function(flag) {
        this._ResetMoveList = flag;
    };

    //自身の直下は常に歩けるようにする
    Game_Temp.prototype.initialMoveTable = function(oriX, oriY, oriMove) {
        this.setMoveTable(oriX, oriY, oriMove, [0]);
        this.pushMoveList([oriX, oriY, false]);
    }

    //自身の直下は常に攻撃射程に含める
    Game_Temp.prototype.initialRangeTable = function(oriX, oriY, oriMove) {
        this.setRangeTable(oriX, oriY, oriMove, [0]);
        this.pushRangeList([oriX, oriY, true]);
    }

    //攻撃ユニットと対象の距離を返す
    Game_Temp.prototype.SrpgDistance = function() {
        return this._SrpgDistance;
    };

    //攻撃ユニットと対象の距離を設定する
    Game_Temp.prototype.setSrpgDistance = function(val) {
        this._SrpgDistance = val;
    };

    //アクティブイベントの設定
    Game_Temp.prototype.activeEvent = function() {
        return this._ActiveEvent;
    };

    Game_Temp.prototype.setActiveEvent = function(event) {
        this._ActiveEvent = event;
        $gameVariables.setValue(_activeEventID, event.eventId());
    };

    Game_Temp.prototype.clearActiveEvent = function() {
        this._ActiveEvent = null;
        $gameVariables.setValue(_activeEventID, 0);
    };

    //行動対象となるユニットの設定
    Game_Temp.prototype.targetEvent = function() {
        return this._TargetEvent;
    };

    Game_Temp.prototype.setTargetEvent = function(event) {
        this._TargetEvent = event;
        if (this._TargetEvent) {
            $gameVariables.setValue(_targetEventID, event.eventId());
        }
    };

    Game_Temp.prototype.clearTargetEvent = function() {
        this._TargetEvent = null;
        $gameVariables.setValue(_targetEventID, 0);
    };

    //アクティブイベントの座標を返す
    Game_Temp.prototype.originalPos = function() {
        return this._OriginalPos;
    };

    //アクティブイベントの座標を記録する
    Game_Temp.prototype.reserveOriginalPos = function(x, y) {
        this._OriginalPos = [x, y];
    };

    //実行待ちイベントリストを確認する
    Game_Temp.prototype.isSrpgEventList = function() {
        return this._SrpgEventList.length > 0;
    };

    //実行待ちイベントリストを追加する
    Game_Temp.prototype.pushSrpgEventList = function(event) {
        this._SrpgEventList.push(event);
    };

    //実行待ちイベントリストの先頭を取得し、前に詰める
    Game_Temp.prototype.shiftSrpgEventList = function() {
        var event = this._SrpgEventList[0];
        this._SrpgEventList.shift();
        return event;
    };

    //プレイヤーの自動移動フラグを返す
    Game_Temp.prototype.isAutoMoveDestinationValid = function() {
        return this._autoMoveDestinationValid;
    };

    //プレイヤーの自動移動フラグを設定する
    Game_Temp.prototype.setAutoMoveDestinationValid = function(val) {
        this._autoMoveDestinationValid = val;
    };

    //プレイヤーの自動移動先を返す(X)
    Game_Temp.prototype.autoMoveDestinationX = function() {
        return this._autoMoveDestinationX;
    };

    //プレイヤーの自動移動先を返す(Y)
    Game_Temp.prototype.autoMoveDestinationY = function() {
        return this._autoMoveDestinationY;
    };

    //プレイヤーの自動移動先を設定する
    Game_Temp.prototype.setAutoMoveDestination = function(x, y) {
        this._autoMoveDestinationX = x;
        this._autoMoveDestinationY = y;
    };

    //戦闘中にロードしたフラグを返す
    Game_Temp.prototype.isSrpgLoadFlag = function() {
        return this._srpgLoadFlag;
    };

    //戦闘中にロードしたフラグを設定する
    Game_Temp.prototype.setSrpgLoadFlag = function(flag) {
        this._srpgLoadFlag = flag;
    };

    //ターン終了フラグを返す
    Game_Temp.prototype.isTurnEndFlag = function() {
        return this._SrpgTurnEndFlag;
    };

    //ターン終了フラグを変更する
    Game_Temp.prototype.setTurnEndFlag = function(flag) {
        this._SrpgTurnEndFlag = flag;
    };

    //オート戦闘フラグを返す
    Game_Temp.prototype.isAutoBattleFlag = function() {
        return this._SrpgAutoBattleFlag;
    };

    //オート戦闘フラグを変更する
    Game_Temp.prototype.setAutoBattleFlag = function(flag) {
        this._SrpgAutoBattleFlag = flag;
    };

    //アクターコマンドから装備を呼び出したフラグを返す
    Game_Temp.prototype.isSrpgActorEquipFlag = function() {
        return this._srpgActorEquipFlag;
    };

    //アクターコマンドから装備を呼び出したフラグを設定する
    Game_Temp.prototype.setSrpgActorEquipFlag = function(flag) {
        this._srpgActorEquipFlag = flag;
    };

    //探索用移動範囲計算時の実行フラグを返す
    Game_Temp.prototype.isSrpgBestSearchFlag = function() {
        return this._srpgBestSearchFlag;
    };

    //探索用移動範囲計算時の実行フラグを設定する
    Game_Temp.prototype.setSrpgBestSearchFlag = function(flag) {
        this._srpgBestSearchFlag = flag;
    };

    //探索用移動範囲計算時の最適ルートを返す
    Game_Temp.prototype.isSrpgBestSearchRoute = function() {
        return this._srpgBestSearchRoute;
    };

    //探索用移動範囲計算時の最適ルートを設定する
    Game_Temp.prototype.setSrpgBestSearchRoute = function(array) {
        this._srpgBestSearchRoute = array;
    };

    //優先ターゲットを返す
    Game_Temp.prototype.isSrpgPriorityTarget = function() {
        return this._srpgPriorityTarget;
    };

    //優先ターゲットを設定する
    Game_Temp.prototype.setSrpgPriorityTarget = function(event) {
        this._srpgPriorityTarget = event;
    };

//====================================================================
// ●Game_System
//====================================================================
//初期化処理
    var _SRPG_Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _SRPG_Game_System_initialize.call(this);
        this._SRPGMode = false;
        this._isBattlePhase = 'initialize';
        this._isSubBattlePhase = 'initialize';
        this._AutoUnitId = 0;
        this._EventToUnit = [];
        this._SrpgStatusWindowRefreshFlag = [false, null];
        this._SrpgBattleWindowRefreshFlag = [false, null, null];
        this._SrpgWaitMoving = false;
        this._SrpgActorCommandWindowRefreshFlag = [false, null];
        this._SrpgActorCommandStatusWindowRefreshFlag = [false, null];
        this._srpgAllActors = []; //SRPGモードに参加する全てのアクターの配列
        this._searchedItemList = [];
        this._winLoseCondition = [];
    };

//変数関係の処理
    //戦闘中かどうかのフラグを返す
    Game_System.prototype.isSRPGMode = function() {
        return this._SRPGMode;
    };

    //戦闘のフェーズを返す
    // initialize：初期化状態
    // actor_phase：アクター行動フェーズ
    // auto_actor_phase：アクター自動行動フェーズ
    // enemy_phase：エネミー行動フェーズ
    Game_System.prototype.isBattlePhase = function() {
        return this._isBattlePhase;
    };

    //戦闘のフェーズを変更する
    Game_System.prototype.setBattlePhase = function(phase) {
        this._isBattlePhase = phase;
    };

    //戦闘のサブフェーズを返す。各BattlePhase内で使用され、処理の進行を制御する。
    // initialize：初期化を行う状態
    // normal：行動アクターが選択されていない状態
    // actor_move：移動範囲が表示され、移動先を選択している状態
    // actor_target：行動対象を選択している状態
    // status_window：ステータスウィンドウが開かれている状態
    // actor_command_window：アクターコマンドウィンドウが開かれている状態
    // battle_window：攻撃確認ウィンドウが開かれている状態
    // auto_actor_command：自動行動アクターをイベント順に行動決定する状態
    // auto_actor_move : 自動行動アクターが移動先を決定し、移動する状態
    // auto_actor_action：自動行動アクターの実際の行動を行う状態
    // enemy_command：エネミーをイベント順に行動決定する状態
    // enemy_move : エネミーが移動先を決定し、移動する状態
    // enemy_action：エネミーの実際の行動を行う状態
    // invoke_action：戦闘を実行している状態
    // after_battle：戦闘終了後の処理を呼び出す状態
    Game_System.prototype.isSubBattlePhase = function() {
        return this._isSubBattlePhase;
    };

    //戦闘のサブフェーズを変更する
    Game_System.prototype.setSubBattlePhase = function(phase) {
        this._isSubBattlePhase = phase;
    };

    //自動行動・エネミーの実行ＩＤを返す
    Game_System.prototype.isAutoUnitId = function() {
        return this._AutoUnitId;
    };

    //自動行動・エネミーの実行ＩＤを設定する
    Game_System.prototype.setAutoUnitId = function(num) {
        this._AutoUnitId = num;
    };

    // ステータスウィンドウのリフレッシュフラグを返す
    Game_System.prototype.srpgStatusWindowNeedRefresh = function() {
        return this._SrpgStatusWindowRefreshFlag;
    };

    // ステータスウィンドウのリフレッシュフラグを設定する
    Game_System.prototype.setSrpgStatusWindowNeedRefresh = function(battlerArray) {
        this._SrpgStatusWindowRefreshFlag = [true, battlerArray];
    };

    // ステータスウィンドウのリフレッシュフラグをクリアする
    Game_System.prototype.clearSrpgStatusWindowNeedRefresh = function() {
        this._SrpgStatusWindowRefreshFlag = [false, null];
    };

    // 予想ウィンドウ・戦闘開始ウィンドウのリフレッシュフラグを返す
    Game_System.prototype.srpgBattleWindowNeedRefresh = function() {
        return this._SrpgBattleWindowRefreshFlag;
    };

    // 予想ウィンドウ・戦闘開始ウィンドウのリフレッシュフラグを設定する
    Game_System.prototype.setSrpgBattleWindowNeedRefresh = function(actionBattlerArray, targetBattlerArray) {
        this._SrpgBattleWindowRefreshFlag = [true, actionBattlerArray, targetBattlerArray];
    };

    // 予想ウィンドウ・戦闘開始ウィンドウのリフレッシュフラグをクリアする
    Game_System.prototype.clearSrpgBattleWindowNeedRefresh = function() {
        this._SrpgBattleWindowRefreshFlag = [false, null, null];
    };

    //移動範囲を表示するスプライトの最大数
    Game_System.prototype.spriteMoveTileMax = function() {
        return Math.min($dataMap.width * $dataMap.height, 1000);
    };

    // 移動中のウェイトフラグを返す
    Game_System.prototype.srpgWaitMoving = function() {
        return this._SrpgWaitMoving;
    };

    // 移動中のウェイトフラグを設定する
    Game_System.prototype.setSrpgWaitMoving = function(flag) {
        this._SrpgWaitMoving = flag;
    };

    // アクターコマンドウィンドウのリフレッシュフラグを返す
    Game_System.prototype.srpgActorCommandWindowNeedRefresh = function() {
        return this._SrpgActorCommandWindowRefreshFlag;
    };

    // アクターコマンドウィンドウのリフレッシュフラグを設定する
    Game_System.prototype.setSrpgActorCommandWindowNeedRefresh = function(battlerArray) {
        this._SrpgActorCommandWindowRefreshFlag = [true, battlerArray];
    };

    // アクターコマンドウィンドウのリフレッシュフラグをクリアする
    Game_System.prototype.clearSrpgActorCommandWindowNeedRefresh = function() {
        this._SrpgActorCommandWindowRefreshFlag = [false, null];
    };

    // 行動中アクターの簡易ステータスウィンドウのリフレッシュフラグを返す
    Game_System.prototype.srpgActorCommandStatusWindowNeedRefresh = function() {
        return this._SrpgActorCommandStatusWindowRefreshFlag;
    };

    // 行動中アクターの簡易ステータスウィンドウのリフレッシュフラグを設定する
    Game_System.prototype.setSrpgActorCommandStatusWindowNeedRefresh = function(battlerArray) {
        this._SrpgActorCommandStatusWindowRefreshFlag = [true, battlerArray];
    };

    // 行動中アクターの簡易ステータスウィンドウのリフレッシュフラグをクリアする
    Game_System.prototype.clearSrpgActorCommandStatusWindowNeedRefresh = function() {
        this._SrpgActorCommandStatusWindowRefreshFlag = [false, null];
    };

    // 勝敗条件の内容を返す
    Game_System.prototype.srpgWinLoseCondition = function() {
        return this._SrpgWinLoseCondition;
    };

    // 勝利条件の内容をクリアする
    Game_System.prototype.clearSrpgWinLoseCondition = function() {
        this._SrpgWinLoseCondition = [];
    };

    // 勝利条件の内容を設定する
    Game_System.prototype.setSrpgWinCondition = function(text) {
        this._SrpgWinLoseCondition.push(['win', text]);
    };

    // 敗北条件の内容を設定する
    Game_System.prototype.setSrpgLoseCondition = function(text) {
        this._SrpgWinLoseCondition.push(['lose', text]);
    };

    //戦闘に参加するアクターのリスト
    Game_System.prototype.srpgAllActors = function() {
        return this._srpgAllActors;
    };

    Game_System.prototype.clearSrpgAllActors = function() {
        this._srpgAllActors = [];
    };

    Game_System.prototype.pushSrpgAllActors = function(actor) {
        this._srpgAllActors.push(actor);
    };

    // 探査済み座標のリスト
    Game_System.prototype.pushSearchedItemList = function(xy) {
        if (!this._searchedItemList) {
            this._searchedItemList = [];
        }
        this._searchedItemList.push(xy);
    };

    Game_System.prototype.indexOfSearchedItemList = function(xy) {
        if (!this._searchedItemList) {
            this._searchedItemList = [];
        }
        var flag = -1;
        for (var i=0; i < this._searchedItemList.length; i++) {
            var xy2 = this._searchedItemList[i];
            if (xy[0] === xy2[0] && xy[1] === xy2[1]) {
                flag = i;
                break;
            }
        };
        return flag;
    };

    Game_System.prototype.resetSearchedItemList = function() {
        this._searchedItemList = [];
    };

//戦闘開始に関係する処理
    //戦闘開始するためのプラグイン・コマンド
    Game_System.prototype.startSRPG = function() {
        this._SRPGMode = true;
        $gameSwitches.setValue(_srpgBattleSwitchID, true);
        this._isBattlePhase = 'initialize';
        this._isSubBattlePhase = 'initialize';
        $gamePlayer.refresh();
        $gameTemp.clearActiveEvent();
        this.clearData(); //データの初期化
        this.setAllEventType(); //イベントタイプの設定
        this.setSrpgActors(); //アクターデータの作成
        this.setSrpgEnemys(); //エネミーデータの作成
        $gameMap.setEventImages();   // ユニットデータに合わせてイベントのグラフィックを変更する
        this.runBattleStartEvent(); // ゲーム開始時の自動イベントを実行する
        $gameVariables.setValue(_turnVarID, 1); //ターン数を初期化する
        $gameSystem.resetSearchedItemList(); //探索済み座標を初期化する
        this.srpgStartActorTurn();//アクターターンを開始する
    };

    //イベントＩＤに対応するアクター・エネミーデータを初期化する
    Game_System.prototype.clearData = function() {
        this._EventToUnit = [];
        $gameSystem.clearSrpgAllActors();
    };

    //イベントＩＤに対応するアクター・エネミーデータをセットする
    Game_System.prototype.setEventToUnit = function(event_id, type, data) {
        this._EventToUnit[event_id] = [type, data];
    };

    //イベントＩＤから対応するアクター・エネミーデータを返す
    Game_System.prototype.EventToUnit = function(event_id) {
        //return this._EventToUnit[event_id];
        var battlerArray = this._EventToUnit[event_id];
        if (battlerArray) {
            if (battlerArray[0] === 'actor') {
                var actor = $gameActors.actor(battlerArray[1]);
                return [battlerArray[0], actor]
            } else {
                return battlerArray;
            }
        } else {
            return;
        }
    };

    //アクターＩＤから対応するイベントＩＤを返す
    Game_System.prototype.ActorToEvent = function(actor_id) {
        var eventId = 0;
        $gameMap.events().forEach(function(event) {
            if (event.isType() === 'actor') {
                var actor = $gameSystem.EventToUnit(event.eventId())[1];
                if (actor && actor.actorId() == actor_id) {
                    eventId = event.eventId();
                }
            }
        });
        return eventId;
    };

    // イベントのメモからイベントのタイプを設定する
    Game_System.prototype.setAllEventType = function() {
        $gameMap.events().forEach(function(event) {
            if (event.event().meta.type) {
                event.setType(event.event().meta.type);
            }
        });
    }

    // イベントのメモからアクターを読み込み、対応するイベントＩＤに紐づけする
    Game_System.prototype.setSrpgActors = function() {
        var fix_actors = [];
        $gameVariables.setValue(_existActorVarID, 0);
        // 固定アクターを予約する
        $gameMap.events().forEach(function(event) {
            if (event.isType() === 'actor' && !event.isErased()) {
                var actorId = event.event().meta.id ? Number(event.event().meta.id) : 0;
                if (actorId > 0) {
                    fix_actors.push(actorId);
                }
            }
        });
        // アクターを読み込む
        var i = 0;
        var array = $gameParty.allMembers();
        var actorNum = 0;
        $gameMap.events().forEach(function(event) {
            if (event.isType() === 'actor' && !event.isErased()) {
                if (_maxActorVarID > 0 && $gameVariables.value(_maxActorVarID) > 0 && 
                    actorNum >= $gameVariables.value(_maxActorVarID)) {
                    event.erase();
                    return;
                }
                var actorId = event.event().meta.id ? Number(event.event().meta.id) : 0;
                if (actorId > 0) {
                    var actor_unit = $gameActors.actor(actorId);
                } else {
                    for (var j=0; j < array.length; j++) {
                        var actor_unit = array[i];
                        if (!actor_unit) {
                            $gameSystem.setEventToUnit(event.eventId(), 'null', null);
                            break;
                        }
                        i += 1;
                        if (fix_actors.indexOf(actor_unit.actorId()) < 0) {
                            break;
                        }
                    };
                }
                if (actor_unit) {
                    $gameSystem.pushSrpgAllActors(event.eventId());
                    if (event.event().meta.mode) {
                        actor_unit.setBattleMode(event.event().meta.mode);
                        if (event.event().meta.targetId) {
                            actor_unit.setTargetId(Number(event.event().meta.targetId));
                        }
                    }
                    actor_unit.setSearchItem(event.event().meta.searchItem);
                    actor_unit.initTp(); //TPを初期化
                    var bitmap = ImageManager.loadFace(actor_unit.faceName()); //顔グラフィックをプリロードする
                    var oldValue = $gameVariables.value(_existActorVarID);
                    $gameVariables.setValue(_existActorVarID, oldValue + 1);
                    actorNum += 1;
                    $gameSystem.setEventToUnit(event.eventId(), 'actor', actor_unit.actorId());
                }
            }
        });
    };

    // イベントのメモからエネミーを読み込み、対応するイベントＩＤに紐づけする
    Game_System.prototype.setSrpgEnemys = function() {
        $gameVariables.setValue(_existEnemyVarID, 0);
        var i = 0;
        $gameMap.events().forEach(function(event) {
            if (event.isType() === 'enemy' && !event.isErased()) {
                var enemyId = event.event().meta.id ? Number(event.event().meta.id) : 1;
                var enemy_unit = new Game_Enemy(enemyId, 0, 0);
                if (enemy_unit) {
                    if (event.event().meta.mode) {
                        enemy_unit.setBattleMode(event.event().meta.mode);
                        if (event.event().meta.targetId) {
                            enemy_unit.setTargetId(Number(event.event().meta.targetId));
                        }
                    }
                    enemy_unit.initTp(); //TPを初期化
                    var faceName = enemy_unit.enemy().meta.faceName; //顔グラフィックをプリロードする
                    if (faceName) {
                        var bitmap = ImageManager.loadFace(faceName);
                    } else {
                        if ($gameSystem.isSideView()) {
                            var bitmap = ImageManager.loadSvEnemy(enemy_unit.battlerName(), enemy_unit.battlerHue());
                        } else {
                            var bitmap = ImageManager.loadEnemy(enemy_unit.battlerName(), enemy_unit.battlerHue());
                        }
                    }
                    var oldValue = $gameVariables.value(_existEnemyVarID);
                    $gameVariables.setValue(_existEnemyVarID, oldValue + 1);
                    $gameSystem.setEventToUnit(event.eventId(), 'enemy', enemy_unit);
                }
            }
        });
    };

    //２イベント間の距離を返す
    Game_System.prototype.unitDistance = function(event1, event2) {
        var minDisX = Math.abs(event1.posX() - event2.posX());
        var minDisY = Math.abs(event1.posY() - event2.posY());
        if ($gameMap.isLoopHorizontal() == true) {
            var event1X = event1.posX() > event2.posX() ? event1.posX() - $gameMap.width() : event1.posX() + $gameMap.width();
            var disX = Math.abs(event1X - event2.posX());
            minDisX = minDisX < disX ? minDisX : disX;
        }
        if ($gameMap.isLoopVertical() == true) {
            var event1Y = event1.posY() > event2.posY() ? event1.posY() - $gameMap.height() : event1.posY() + $gameMap.height();
            var disY = Math.abs(event1Y - event2.posY());
            minDisY = minDisY < disY ? minDisY : disY;
        }
        return minDisX + minDisY;
    };

//戦闘終了に関係する処理
    //戦闘終了するためのプラグイン・コマンド
    Game_System.prototype.endSRPG = function() {
        $gameTemp.clearActiveEvent();
        $gameMap.events().forEach(function(event) {
            var battlerArray = $gameSystem.EventToUnit(event.eventId());
            if (battlerArray && (battlerArray[0] === 'actor' || battlerArray[0] === 'enemy')) {
                if (_srpgBattleEndAllHeal == 'true') {
                    battlerArray[1].recoverAll();
                }
                battlerArray[1].onTurnEnd();
            }
        });
        this._SRPGMode = false;
        $gameSwitches.setValue(_srpgBattleSwitchID, false);
        this._isBattlePhase = 'initialize';
        this._isSubBattlePhase = 'initialize';
        $gamePlayer.refresh();
        this.clearData(); //データの初期化
        $gameMap.setEventImages();   // ユニットデータに合わせてイベントのグラフィックを変更する
    };

//戦闘の進行に関係する処理
    // 戦闘開始時のイベントを起動する
    Game_System.prototype.runBattleStartEvent = function() {
        $gameMap.events().forEach(function(event) {
            if (event.isType() === 'battleStart') {
                if (event.pageIndex() >= 0) event.start();
                $gameTemp.pushSrpgEventList(event);
            }
        });
    };

    //次のカーソル移動先のアクターを取得する(R)
    Game_System.prototype.getNextRActor = function() {
        for (var i = 0; i < this.aliveActorIdList.length; i++) {
            this.actorLRId += 1;
            if (this.actorLRId >= this.aliveActorIdList.length) this.actorLRId = 0;
            //if (this.actorLRId < 0) this.actorLRId = this.aliveActorIdList.length - 1;
            var battlerArray = $gameSystem.EventToUnit(this.aliveActorIdList[this.actorLRId]);
            if (battlerArray && battlerArray[0] === 'actor' && battlerArray[1].isAlive()) {
                break;
            }
        }
        var actor1 = $gameMap.event(this.aliveActorIdList[this.actorLRId]);
        if (actor1) {
            $gameTemp.setAutoMoveDestinationValid(true);
            $gameTemp.setAutoMoveDestination(actor1.posX(), actor1.posY());
        }
    }

    //次のカーソル移動先のアクターを取得する(L)
    Game_System.prototype.getNextLActor = function() {
        for (var i = 0; i < this.aliveActorIdList.length; i++) {
            this.actorLRId -= 1;
            //if (this.actorLRId >= this.aliveActorIdList.length) this.actorLRId = 0;
            if (this.actorLRId < 0) this.actorLRId = this.aliveActorIdList.length - 1;
            var battlerArray = $gameSystem.EventToUnit(this.aliveActorIdList[this.actorLRId]);
            if (battlerArray && battlerArray[0] === 'actor' && battlerArray[1].isAlive()) {
                break;
            }
        }
        var actor1 = $gameMap.event(this.aliveActorIdList[this.actorLRId]);
        if (actor1) {
            $gameTemp.setAutoMoveDestinationValid(true);
            $gameTemp.setAutoMoveDestination(actor1.posX(), actor1.posY());
        }
    }

    //アクターターンの開始
    Game_System.prototype.srpgStartActorTurn = function() {
        this.aliveActorIdList = [];
        this.actorLRId = 0;
        $gameMap.events().forEach(function(event) {
            if (event.isType() === 'actorTurn') {
                if (event.pageIndex() >= 0) event.start();
                $gameTemp.pushSrpgEventList(event);
            }
            var battlerArray = $gameSystem.EventToUnit(event.eventId());
            if (battlerArray && battlerArray[0] === 'actor' && battlerArray[1].isAlive()) {
                $gameSystem.aliveActorIdList.push(event.eventId());
                battlerArray[1].SRPGActionTimesSet();
            }
            if (battlerArray && battlerArray[0] === 'enemy' && battlerArray[1].isAlive()) {
                battlerArray[1].SRPGActionTimesSet();
            }
        });
        this.aliveActorIdList.sort(function(a, b) {
            return a - b;
        });
        var actor1 = $gameMap.event(this.aliveActorIdList[0]);
        if (actor1) {
            $gameTemp.setAutoMoveDestinationValid(true);
            $gameTemp.setAutoMoveDestination(actor1.posX(), actor1.posY());
        }
        this.setBattlePhase('actor_phase');
        this.setSubBattlePhase('initialize');
    };

    //自動行動アクターターンの開始
    Game_System.prototype.srpgStartAutoActorTurn = function() {
        this.setBattlePhase('auto_actor_phase');
        this.setSubBattlePhase('auto_actor_command');
    };

    //エネミーターンの開始
    Game_System.prototype.srpgStartEnemyTurn = function() {
        $gameMap.events().forEach(function(event) {
            if (event.isType() === 'enemyTurn') {
                if (event.pageIndex() >= 0) event.start();
                $gameTemp.pushSrpgEventList(event);
            }
        });
        this.setBattlePhase('enemy_phase');
        this.setSubBattlePhase('enemy_command');
    };

    //ターン終了
    Game_System.prototype.srpgTurnEnd = function() {
        $gameMap.events().forEach(function(event) {
            var battlerArray = $gameSystem.EventToUnit(event.eventId());
            if (battlerArray && (battlerArray[0] === 'actor' || battlerArray[0] === 'enemy')) {
                battlerArray[1].onTurnEnd();
            }
        });
        $gameMap.events().forEach(function(event) {
            if (event.isType() === 'turnEnd') {
                if (event.pageIndex() >= 0) event.start();
                $gameTemp.pushSrpgEventList(event);
            }
        });
        this.srpgTurnPlus();
        this.srpgStartActorTurn();//アクターターンを開始する
    };

    //ターン数を増やす
    Game_System.prototype.srpgTurnPlus = function() {
        var oldValue = $gameVariables.value(_turnVarID);
        $gameVariables.setValue(_turnVarID, oldValue + 1);
    };

//戦闘の計算に関係する処理
    // 移動範囲および攻撃範囲を計算・表示する
    Game_System.prototype.srpgMakeMoveTable = function(event) {
        var battlerArray = $gameSystem.EventToUnit(event.eventId());
        $gameTemp.clearMoveTable();
        $gameTemp.initialMoveTable(event.posX(), event.posY(), battlerArray[1].srpgMove());
        event.makeMoveTable(event.posX(), event.posY(), battlerArray[1].srpgMove(), [0], battlerArray[1].srpgThroughTag());
        var list = $gameTemp.moveList();
        if (battlerArray[1].action(0) && battlerArray[1].action(0).item()) {
            var range = battlerArray[1].srpgSkillRange(battlerArray[1].action(0).item());
            var item = battlerArray[1].action(0).item();
        } else {
            var range = battlerArray[1].srpgWeaponRange();
            var item = $dataSkills[battlerArray[1].attackSkillId()];
        }
        for (var i = 0; i < list.length; i++) {
            var pos = list[i];
            var flag = this.areTheyNoUnits(pos[0], pos[1], '');
            if (flag == true && _srpgBestSearchRouteSize > 0) event.makeRangeTable(pos[0], pos[1], range, [0], pos[0], pos[1], item);
        }
        $gameTemp.pushRangeListToMoveList();
    };

    //移動先にアクターまたはエネミーがいる場合は移動できない（重なりを避ける）
    Game_System.prototype.areTheyNoUnits = function(x, y, type) {
        var flag = true;
        $gameMap.eventsXy(x, y).forEach(function(event) {
            var battlerArray = $gameSystem.EventToUnit(event._eventId);
            if (battlerArray && event != $gameTemp.activeEvent() && !event.isErased() ||
                event.isType() === 'playerEvent') {
                flag = false;
            }
        });
        return flag;
    };

    //移動先にイベントユニットがあるかどうか
    Game_System.prototype.isThereEventUnit = function(x, y) {
        var flag = false;
        $gameMap.eventsXy(x, y).forEach(function(event) {
            if (event.isType() === 'unitEvent') {
                flag = true;
            }
        });
        return flag;
    };

//==================================================================
// ●Game_Action
//====================================================================
    // 予想ダメージの計算
    Game_Action.prototype.srpgPredictionDamage = function(target) {
        var item = this.item();
        if (this.item().damage.type > 0) {
            var baseValue = this.evalDamageFormula(target);
        } else {
            var baseValue = 0;
        }
        var value = baseValue * this.calcElementRate(target);
        if (this.isPhysical()) {
            value *= target.pdr;
        }
        if (this.isMagical()) {
            value *= target.mdr;
        }
        if (baseValue < 0) {
            value *= target.rec;
        }
        item.effects.forEach(function(effect) {
            value -= this.srpgPredictionItemEffect(target, effect);
        }, this);
        return Math.round(value);
    };

    // エネミーアクションのインデックスを設定する
    Game_Action.prototype.srpgPredictionItemEffect = function(target, effect) {
        switch (effect.code) {
        case Game_Action.EFFECT_RECOVER_HP:
            var value = (target.mhp * effect.value1 + effect.value2) * target.rec;
            if (this.isItem()) {
                value *= this.subject().pha;
            }
            return Math.floor(value);
        case Game_Action.EFFECT_RECOVER_MP:
            var value = (target.mmp * effect.value1 + effect.value2) * target.rec;
            if (this.isItem()) {
                value *= this.subject().pha;
            }
            return Math.floor(value);
        case Game_Action.EFFECT_GAIN_TP:
            var value = Math.floor(effect.value1);
            return Math.floor(value);
        }
        return 0;
    };

    // エネミーアクションのインデックスを設定する
    Game_Action.prototype.setSrpgEnemySubject = function(index) {
        this._subjectEnemyIndex = index;
        this._subjectActorId = 0;
    };

    // 混乱状態でのターゲットを設定する
    var _SRPG_Game_Action_confusionTarget = Game_Action.prototype.confusionTarget;
    Game_Action.prototype.confusionTarget = function() {
        if ($gameSystem.isSRPGMode() == true) {
            if (this._targetIndex == 0) {
                 return this.opponentsUnit().smoothTarget(this._targetIndex);
            } else {
                 return this.friendsUnit().smoothTarget(this._targetIndex);
            }
        } else {
            _SRPG_Game_Action_confusionTarget.call(this);
        }
    };


//==================================================================
// ●Game_BattlerBase
//====================================================================
    // 初期処理
    var _SRPG_Game_BattlerBase_initMembers = Game_BattlerBase.prototype.initMembers;
    Game_BattlerBase.prototype.initMembers = function() {
        _SRPG_Game_BattlerBase_initMembers.call(this);
        this._srpgTurnEnd = false;
        this._srpgActionTiming = -1; // 0:攻撃側、1:防御側
    };

    // 移動力を返す（定義は、gameActor, gameEnemyで行う）
    Game_BattlerBase.prototype.srpgMove = function() {
        return 0;
    };

    // スキル・アイテムの射程を返す（定義は、gameActor, gameEnemyで行う）
    Game_BattlerBase.prototype.srpgSkillRange = function(skill) {
        return 0;
    };

    // 武器の攻撃射程を返す（定義は、gameActor, gameEnemyで行う）
    Game_BattlerBase.prototype.srpgWeaponRange = function() {
        return 0;
    };

    // 武器が反撃可能かを返す（定義は、gameActor, gameEnemyで行う）
    Game_BattlerBase.prototype.srpgWeaponCounter = function() {
        return true;
    };

    // 通行可能タグを返す（定義は、gameActor, gameEnemyで行う）
    Game_BattlerBase.prototype.srpgThroughTag = function() {
        return 0;
    };

    //行動終了かどうかを返す
    Game_BattlerBase.prototype.srpgTurnEnd = function() {
        return this._srpgTurnEnd;
    };

    //行動終了を設定する
    Game_BattlerBase.prototype.setSrpgTurnEnd = function(flag) {
        this._srpgTurnEnd = flag;
    };

    //攻撃側か防御側かを返す
    Game_BattlerBase.prototype.srpgActionTiming = function() {
        return this._srpgActionTiming;
    };

    //攻撃側か防御側かを設定する
    Game_BattlerBase.prototype.setActionTiming = function(timing) {
        this._srpgActionTiming = timing;
    };

    //攻撃ユニットと対象が特殊射程内にいるかを返す
    Game_BattlerBase.prototype.SrpgSpecialRange = function(skill) {
        var flag = true;
        if (skill && skill.meta.specialRange) {
            var range = this.srpgSkillRange(skill);
            flag = $gameTemp.activeEvent().srpgRangeExtention($gameTemp.targetEvent().posX(), $gameTemp.targetEvent().posY(), $gameTemp.activeEvent().posX(), $gameTemp.activeEvent().posY(), skill, range);
        }
        return flag;
    };

    // 入力可能かどうかの判定
    var _SRPG_Game_BattlerBase_canInput = Game_BattlerBase.prototype.canInput;
    Game_BattlerBase.prototype.canInput = function() {
        if ($gameSystem.isSRPGMode() == true) {
            return this.isAppeared() && !this.isRestricted() && !this.isAutoBattle() &&
                   !this.srpgTurnEnd();
        } else {
            return _SRPG_Game_BattlerBase_canInput.call(this);
        }
    };

    // スキル・アイテムが使用可能かの判定
    var _SRPG_Game_BattlerBase_isOccasionOk = Game_BattlerBase.prototype.isOccasionOk;
    Game_BattlerBase.prototype.isOccasionOk = function(item) {
        if ($gameSystem.isSRPGMode() == true) {
            if ($gameSystem.isBattlePhase() === 'actor_phase' &&
                $gameSystem.isSubBattlePhase() === 'normal') {
                return false;
            } else {
                return item.occasion === 0 || item.occasion === 1;
            }
        } else {
            return _SRPG_Game_BattlerBase_isOccasionOk.call(this, item);
        }
    };

    // スキル・アイテムが使用可能かの判定
    var _SRPG_Game_BattlerBase_canUse = Game_BattlerBase.prototype.canUse;
    Game_BattlerBase.prototype.canUse = function(item) {
        if ($gameSystem.isSRPGMode() == true) {
            if (!item) {
                return false;
            }
            if ($gameSystem.isBattlePhase() === 'actor_phase' && 
                $gameSystem.isSubBattlePhase() === 'normal') {
                return false;
            }
            if (($gameSystem.isSubBattlePhase() === 'invoke_action' ||
                 $gameSystem.isSubBattlePhase() === 'auto_actor_action' ||
                 $gameSystem.isSubBattlePhase() === 'enemy_action' ||
                 $gameSystem.isSubBattlePhase() === 'battle_window') &&
                (this.srpgSkillRange(item) < $gameTemp.SrpgDistance() ||
                this.srpgSkillMinRange(item) > $gameTemp.SrpgDistance() ||
                this.SrpgSpecialRange(item) == false ||
                (this._srpgActionTiming == 1 && this.srpgWeaponCounter() == false) ||
                (item.meta.notUseAfterMove && ($gameTemp.originalPos()[0] != $gameTemp.activeEvent().posX() ||
                 $gameTemp.originalPos()[1] != $gameTemp.activeEvent().posY()))
                )) {
                return false;
            }
        }
        return _SRPG_Game_BattlerBase_canUse.call(this, item);
    };

    // ステートのターン経過処理（ＳＲＰＧ用）
    // 行動終了時：行動ごとに１ターン経過
    // ターン終了時：全体のターン終了ごとに１ターン経過
    Game_BattlerBase.prototype.updateSrpgStateTurns = function(timing) {
        this._states.forEach(function(stateId) {
            if (this._stateTurns[stateId] > 0 && $dataStates[stateId].autoRemovalTiming === timing) {
                this._stateTurns[stateId]--;
            }
        }, this);
    };

/*
    // 「隠れ」時に存在するユニット数を減らす
    var _SRPG_Game_BattlerBase_hide = Game_BattlerBase.prototype.hide;
    Game_BattlerBase.prototype.hide = function() {
        _SRPG_Game_BattlerBase_hide.call(this);
        if (this.isActor()) {
            var oldValue = $gameVariables.value(_existActorVarID);
            $gameVariables.setValue(_existActorVarID, oldValue - 1);
        } else {
            var oldValue = $gameVariables.value(_existEnemyVarID);
            $gameVariables.setValue(_existEnemyVarID, oldValue - 1);
        }
    };

    // 「隠れ」解除時に存在するユニット数を増やす
    var _SRPG_Game_BattlerBase_appear = Game_BattlerBase.prototype.appear;
    Game_BattlerBase.prototype.appear = function() {
        _SRPG_Game_BattlerBase_appear.call(this);
        if (this.isActor()) {
            var oldValue = $gameVariables.value(_existActorVarID);
            $gameVariables.setValue(_existActorVarID, oldValue + 1);
        } else {
            var oldValue = $gameVariables.value(_existEnemyVarID);
            $gameVariables.setValue(_existEnemyVarID, oldValue + 1);
        }
    };
*/

//====================================================================
// ●Game_Battler
//====================================================================
    var _SRPG_Game_Battler_initMembers = Game_Battler.prototype.initMembers;
    Game_Battler.prototype.initMembers = function() {
        _SRPG_Game_Battler_initMembers.call(this);
        this._battleMode = 'normal';
        this._searchItem = false;
        this._targetId = -1;
        this._SRPGActionTimes = 1;
    };

    // 行動モードの設定
    Game_Battler.prototype.setBattleMode = function(mode) {
        this._battleMode = mode;
    };

    Game_Battler.prototype.battleMode = function() {
        return this._battleMode;
    };

    // アイテム探査モードの設定
    Game_Battler.prototype.setSearchItem = function(mode) {
        if (mode) {
            this._searchItem = true;
        } else {
            this._searchItem = false;
        }
    };

    Game_Battler.prototype.searchItem = function() {
        return this._searchItem;
    };

    // ターゲットＩＤの設定
    Game_Battler.prototype.setTargetId = function(id) {
        this._targetId = id;
    };

    Game_Battler.prototype.targetId = function() {
        return this._targetId;
    };

    // 行動回数を設定する（SRPG用）
    Game_Battler.prototype.SRPGActionTimesSet = function() {
        this._SRPGActionTimes = _SRPG_Game_Battler_makeActionTimes.call(this);
    };

    // 行動回数を追加する（SRPG用）
    Game_Battler.prototype.SRPGActionTimesAdd = function(num) {
        this._SRPGActionTimes += num;
    };

    // 行動回数を返す
    Game_Battler.prototype.SRPGActionTimes = function() {
        return this._SRPGActionTimes;
    };

    // 行動回数を消費する
    Game_Battler.prototype.useSRPGActionTimes = function(num) {
        this._SRPGActionTimes -= num;
    };

    // 行動回数の設定（戦闘用）
    var _SRPG_Game_Battler_makeActionTimes = Game_Battler.prototype.makeActionTimes;
    Game_Battler.prototype.makeActionTimes = function() {
        if ($gameSystem.isSRPGMode() == true) {
            return 1;
        } else {
            return _SRPG_Game_Battler_makeActionTimes.call(this);
        }
    };

    // アクションのから配列を作成する
    Game_Battler.prototype.srpgMakeNewActions = function() {
        this.clearActions();
        //if (this.canMove()) {
            var actionTimes = this.makeActionTimes();
            this._actions = [];
            for (var i = 0; i < actionTimes; i++) {
                this._actions.push(new Game_Action(this));
            }
        //}
        this.setActionState('waiting');
    };

    // 行動開始時の処理
    var _SRPG_Game_Battler_onBattleStart = Game_Battler.prototype.onBattleStart;
    Game_Battler.prototype.onBattleStart = function() {
        if ($gameSystem.isSRPGMode() == true) {
            this.setActionState('undecided');
            this.clearMotion();
        } else {
            return _SRPG_Game_Battler_onBattleStart.call(this);
        }
    };

    // 行動終了時の処理
    var _SRPG_Game_Battler_onAllActionsEnd = Game_Battler.prototype.onAllActionsEnd;
    Game_Battler.prototype.onAllActionsEnd = function() {
        if ($gameSystem.isSRPGMode() == true) {
            this.updateSrpgStateTurns(1);
            this.removeStatesAuto(1);
            this.clearResult();
        } else {
            return _SRPG_Game_Battler_onAllActionsEnd.call(this);
        }
    };

    // ターン終了時の処理
    var _SRPG_Game_Battler_onTurnEnd = Game_Battler.prototype.onTurnEnd;
    Game_Battler.prototype.onTurnEnd = function() {
        if ($gameSystem.isSRPGMode() == true) {
            this.regenerateAll();
            this.updateSrpgStateTurns(2);
            this.updateBuffTurns();
            this.removeStatesAuto(2);
            this.removeBuffsAuto();
            this.clearResult();
            this.setSrpgTurnEnd(false);
        } else {
            return _SRPG_Game_Battler_onTurnEnd.call(this);
        }
    };

    Game_Battler.prototype.srpgCheckFloorEffect = function(x, y) {
        if ($gameMap.isDamageFloor(x, y) == true) {
            this.srpgExecuteFloorDamage();
        }
    };

    Game_Battler.prototype.srpgExecuteFloorDamage = function() {
        var damage = Math.floor(this.srpgBasicFloorDamage() * this.fdr);
        damage = Math.min(damage, this.srpgMaxFloorDamage());
        this.gainHp(-damage);
        if (damage > 0) {
            $gameScreen.startFlashForDamage();
        }
    };

    Game_Battler.prototype.srpgBasicFloorDamage = function() {
        return this.mhp * 0.1;
    };

    Game_Battler.prototype.srpgMaxFloorDamage = function() {
        return $dataSystem.optFloorDeath ? this.hp : Math.max(this.hp - 1, 0);
    };

//====================================================================
// ●Game_Actor
//====================================================================
    // 装備変更可能か
    Window_EquipSlot.prototype.isEnabled = function(index) {
        return this._actor ? this._actor.isEquipChangeOk(index) : false;
    };

    var _SRPG_Game_Actor_isEquipChangeOk = Game_Actor.prototype.isEquipChangeOk;
    Game_Actor.prototype.isEquipChangeOk = function(slotId) {
        if ($gameSystem.isSRPGMode() == true) {
            if (this.srpgTurnEnd() == true || this.isRestricted() == true) {
                return false;
            } else {
                return _SRPG_Game_Actor_isEquipChangeOk.call(this, slotId);
            }
        } else {
            return _SRPG_Game_Actor_isEquipChangeOk.call(this, slotId);
        }
    };

    // アクターコマンドで装備が可能か（移動後は不可）
    Game_Actor.prototype.canSrpgEquip = function() {
        return $gameTemp.originalPos()[0] == $gameTemp.activeEvent().posX() &&
               $gameTemp.originalPos()[1] == $gameTemp.activeEvent().posY();
    };

    // 経験値の割合を返す
    Game_Actor.prototype.expRate = function() {
        if (this.isMaxLevel()) {
            var rate = 1.0;
        } else {
            var rate = (this.currentExp() - this.currentLevelExp()) / (this.nextLevelExp() - this.currentLevelExp());
        }
        return rate;
    };

    // 移動力を返す
    Game_Actor.prototype.srpgMove = function() {
        var n = this.currentClass().meta.srpgMove;
        if (!n) {
            n = _defaultMove;
        }
        n = Number(n);
        // ステートによる変更
        this.states().forEach(function(state) {
            if (state.meta.srpgMovePlus) {
                n += Number(state.meta.srpgMovePlus);
            }
        }, this);
        // 装備による変更
        var equips = this.equips();
        for (var i = 0; i < equips.length; i++) {
            var item = equips[i];
            if (item && item.meta.srpgMovePlus) {
                n += Number(item.meta.srpgMovePlus);
            }
        }
        n = Number(Math.max(n, 0));
        return n;
    };

    // スキル・アイテムの射程を返す
    Game_Actor.prototype.srpgSkillRange = function(skill) {
        var range = 1;
        if (skill && skill.meta.srpgRange == -1) {
            if (!this.hasNoWeapons()) {
                weapon = this.weapons()[0];
                range = Number(weapon.meta.weaponRange);
                // ステートによる変更
                this.states().forEach(function(state) {
                    if (state && state.meta.srpgWRangePlus) {
                        range += Number(state.meta.srpgWRangePlus);
                    }
                }, this);
                // 装備による変更
                this.armors().forEach(function(armor) {
                    if (armor && armor.meta.srpgWRangePlus) {
                        range += Number(armor.meta.srpgWRangePlus);
                    }
                }, this);
            }
        } else if (skill.meta.srpgRange) {
            range = skill.meta.srpgRange;
        } else {
            range = 1;
        }
        return Number(range);
    };

    // 武器の攻撃射程を返す
    Game_Actor.prototype.srpgWeaponRange = function() {
        return this.srpgSkillRange($dataSkills[this.attackSkillId()]);
    };

    // 武器が反撃可能かを返す
    Game_Actor.prototype.srpgWeaponCounter = function() {
        if (this.hasNoWeapons()) {
            return true;
        } else {
            var weapon = this.weapons()[0];
            if (!weapon.meta.srpgCounter || !weapon.meta.srpgCounter == 'false') {
                return true;
            } else {
                return false;
            }
        }
    };

    // 通行可能タグを返す（class, equip, stateの設定で最大の物を採用する）
    Game_Actor.prototype.srpgThroughTag = function() {
        var n = 0;
        // 職業
        if (this.currentClass().meta.srpgThroughTag && n < Number(this.currentClass().meta.srpgThroughTag)) {
            n = Number(this.currentClass().meta.srpgThroughTag);
        }
        // ステート
        this.states().forEach(function(state) {
            if (state.meta.srpgThroughTag && n < Number(state.meta.srpgThroughTag)) {
                n = Number(state.meta.srpgThroughTag);
            }
        }, this);
        // 装備
        var equips = this.equips();
        for (var i = 0; i < equips.length; i++) {
            var item = equips[i];
            if (item && item.meta.srpgThroughTag && n < Number(item.meta.srpgThroughTag)) {
                n = Number(item.meta.srpgThroughTag);
            }
        }
        return n;
    };

    // スキル・アイテムの最低射程を返す
    Game_Actor.prototype.srpgSkillMinRange = function(skill) {
        var minRange = 0;
        if (skill) {
            if (skill.meta.srpgRange == -1) {
                if (!this.hasNoWeapons()) {
                    var weapon = this.weapons()[0];
                    minRange = weapon.meta.weaponMinRange;
                }
            } else if (skill.meta.srpgMinRange) {
                minRange = skill.meta.srpgMinRange;
            }
            if (!minRange) minRange = 0;
        } else {
            minRange = 0;
        }
        if (Number(minRange) > this.srpgSkillRange(skill)) minRange = this.srpgSkillRange(skill);
        return Number(minRange);
    };

    // 武器の最低射程を返す
    Game_Actor.prototype.srpgWeaponMinRange = function() {
        return this.srpgSkillMinRange($dataSkills[this.attackSkillId()]);
    };

    // attackSkillId == 1 以外の武器を作る
    Game_Actor.prototype.attackSkillId = function() {
        var weapon = this.weapons()[0];
        if (weapon && weapon.meta.srpgWeaponSkill) {
            return Number(weapon.meta.srpgWeaponSkill);
        } else {
            return Game_BattlerBase.prototype.attackSkillId.call(this);
        }
    };

    // 行動に通常攻撃を設定する
    Game_Actor.prototype.setActionAttack = function() {
        this.clearActions();
        this._actions = [];
        this._actions.push(new Game_Action(this));
        this._actions[0].setSkill(this.attackSkillId());
    };

    //自動行動を決定する
    var _SRPG_Game_Actor_makeAutoBattleActions = Game_Actor.prototype.makeAutoBattleActions;
    Game_Actor.prototype.makeAutoBattleActions = function() {
        if ($gameSystem.isSRPGMode() == true) {
            for (var i = 0; i < this.numActions(); i++) {
                var list = this.makeActionList();
                this.setAction(i, list[Math.randomInt(list.length)]);
            }
            this.setActionState('waiting');
        } else {
            return _SRPG_Game_Actor_makeAutoBattleActions.call(this);
        }
    };

//====================================================================
// ●Game_Enemy
//====================================================================
    // 戦闘画面での座標を設定する
    Game_Enemy.prototype.setScreenXy = function(x, y) {
        this._screenX = x;
        this._screenY = y;
    };

    // 移動力を返す
    Game_Enemy.prototype.srpgMove = function() {
        var n = this.enemy().meta.srpgMove;
        if (!n) {
            n = _defaultMove;
        }
        n = Number(n);
        // ステートによる変更
        this.states().forEach(function(state) {
            if (state.meta.srpgMovePlus) {
                n += Number(state.meta.srpgMovePlus);
            }
        }, this);
        // 装備による変更
        if (!this.hasNoWeapons()) {
            var item = $dataWeapons[Number(this.enemy().meta.srpgWeapon)];
            if (item && item.meta.srpgMovePlus) {
                n += Number(item.meta.srpgMovePlus);
            }
        }
        n = Number(Math.max(n, 0));
        return n;
    };

    // スキル・アイテムの射程を返す
    Game_Enemy.prototype.srpgSkillRange = function(skill) {
        var range = 1;
        if (skill && skill.meta.srpgRange == -1) {
            if (!this.hasNoWeapons()) {
                var weapon = $dataWeapons[Number(this.enemy().meta.srpgWeapon)];
                range = Number(weapon.meta.weaponRange);
            } else {
                range = Number(this.enemy().meta.weaponRange);
            }
            // ステートによる変更
            this.states().forEach(function(state) {
                if (state && state.meta.srpgWRangePlus) {
                    range += Number(state.meta.srpgWRangePlus);
                }
            }, this);
        } else if (skill.meta.srpgRange) {
            range = skill.meta.srpgRange;
        } else {
            range = 1;
        }
        return Number(range);
    };

    // 武器の攻撃射程を返す
    Game_Enemy.prototype.srpgWeaponRange = function() {
        return this.srpgSkillRange($dataSkills[this.attackSkillId()]);
    };

    // 武器が反撃可能かを返す
    Game_Enemy.prototype.srpgWeaponCounter = function() {
        if (!this.hasNoWeapons()) {
            var weapon = $dataWeapons[Number(this.enemy().meta.srpgWeapon)];
            var counter = weapon.meta.srpgCounter;
        } else {
            var counter = this.enemy().meta.srpgCounter;
        } 
        if (!counter || !counter == 'false') {
            return true;
        } else {
            return false;
        }
    };

    // 通行可能タグを返す（enemy, equip, stateの設定で最大の物を採用する）
    Game_Enemy.prototype.srpgThroughTag = function() {
        var n = 0;
        // エネミー
        if (this.enemy().meta.srpgThroughTag && n < Number(this.enemy().meta.srpgThroughTag)) {
            n = Number(this.enemy().meta.srpgThroughTag);
        }
        // ステート
        this.states().forEach(function(state) {
            if (state.meta.srpgThroughTag && n < Number(state.meta.srpgThroughTag)) {
                n = Number(state.meta.srpgThroughTag);
            }
        }, this);
        // 装備
        if (!this.hasNoWeapons()) {
            var item = $dataWeapons[Number(this.enemy().meta.srpgWeapon)];
            if (item && item.meta.srpgThroughTag && n < Number(item.meta.srpgThroughTag)) {
                n = Number(item.meta.srpgThroughTag);
            }
        }
        return n;
    };

    // スキル・アイテムの最低射程を返す
    Game_Enemy.prototype.srpgSkillMinRange = function(skill) {
        var minRange = 0;
        if (skill) {
            if (skill.meta.srpgRange == -1) {
                if (!this.hasNoWeapons()) {
                    var weapon = $dataWeapons[Number(this.enemy().meta.srpgWeapon)];
                    minRange = weapon.meta.weaponMinRange;
                } else {
                    minRange = this.enemy().meta.weaponMinRange;
                }
            } else if (skill.meta.srpgMinRange) {
                minRange = skill.meta.srpgMinRange;
            }
            if (!minRange) minRange = 0;
        } else {
            minRange = 0;
        }
        if (Number(minRange) > this.srpgSkillRange(skill)) minRange = this.srpgSkillRange(skill);
        return Number(minRange);
    };

    // 武器の最低射程を返す
    Game_Enemy.prototype.srpgWeaponMinRange = function() {
        return this.srpgSkillMinRange($dataSkills[this.attackSkillId()]);
    };

    // 武器を装備しているか返す
    Game_Enemy.prototype.hasNoWeapons = function() {
        return !$dataWeapons[Number(this.enemy().meta.srpgWeapon)];
    };

    // 装備の特徴を反映する
    var _SRPG_Game_Enemy_traitObjects = Game_Enemy.prototype.traitObjects;
    Game_Enemy.prototype.traitObjects = function() {
        var objects = _SRPG_Game_Enemy_traitObjects.call(this);
        if ($gameSystem.isSRPGMode() == true) {
            var item = $dataWeapons[Number(this.enemy().meta.srpgWeapon)];
            if (item) {
                objects.push(item);
            }
        }
        return objects;
    };

    // 装備の能力変化値を反映する
    Game_Enemy.prototype.paramPlus = function(paramId) {
        var value = Game_Battler.prototype.paramPlus.call(this, paramId);
        if ($gameSystem.isSRPGMode() == true) {
            var item = $dataWeapons[Number(this.enemy().meta.srpgWeapon)];
            if (item) {
                value += item.params[paramId];
            }
        }
        return value;
    };

    // 装備のアニメーションを反映する
    Game_Enemy.prototype.attackAnimationId = function() {
        if (this.hasNoWeapons()) {
            return this.bareHandsAnimationId();
        } else {
            var weapons = $dataWeapons[Number(this.enemy().meta.srpgWeapon)];
            return weapons ? weapons.animationId : 1;
        }
    };

    // 装備が設定されていない（素手）の時のアニメーションＩＤ
    Game_Enemy.prototype.bareHandsAnimationId = function() {
        return 1;
    };

    // attackSkillId == 1 以外の武器を作る
    Game_Enemy.prototype.attackSkillId = function() {
        var weapon = $dataWeapons[Number(this.enemy().meta.srpgWeapon)];
        if (weapon && weapon.meta.srpgWeaponSkill) {
            return Number(weapon.meta.srpgWeaponSkill);
        } else {
            return Game_BattlerBase.prototype.attackSkillId.call(this);
        }
    };

    // ＳＲＰＧ用の行動決定
    Game_Enemy.prototype.makeSrpgActions = function() {
        Game_Battler.prototype.makeActions.call(this);
        if (this.numActions() > 0) {
            if (this.isConfused()) {
                this.makeConfusionActions();
            } else {
                var actionList = this.enemy().actions.filter(function(a) {
                    if (a.skillId == 1) {
                        a.skillId = this.attackSkillId();
                    }
                    return this.isActionValid(a);
                }, this);
                if (actionList.length > 0) {
                    this.selectAllActions(actionList);
                }
            }
        }
        this.setActionState('waiting');
    };

    // ＳＲＰＧ用の行動決定
    Game_Enemy.prototype.makeConfusionActions = function() {
        for (var i = 0; i < this.numActions(); i++) {
            this.action(i).setSkill(this.attackSkillId());
        }
    };

    // 行動に通常攻撃を設定する
    Game_Enemy.prototype.setActionAttack = function() {
        this.clearActions();
        this._actions = [];
        this._actions.push(new Game_Action(this));
        this._actions[0].setSkill(this.attackSkillId());
    };

//====================================================================
// ●Game_Unit
//====================================================================
    var _SRPG_Game_Unit_onBattleEnd = Game_Unit.prototype.onBattleEnd;
    Game_Unit.prototype.onBattleEnd = function() {
        if ($gameSystem.isSRPGMode() == true) {
            this._inBattle = false;
        } else {
            _SRPG_Game_Unit_onBattleEnd.call(this);
        }
    };

//====================================================================
// ●Game_Party
//====================================================================
    // 初期化
    var _SRPG_Game_Party_initialize = Game_Party.prototype.initialize;
    Game_Party.prototype.initialize = function() {
        _SRPG_Game_Party_initialize.call(this);
        this._srpgBattleActors = []; //SRPGモードの戦闘時に呼び出すメンバーを設定する（行動者と対象者）
    };

    Game_Party.prototype.SrpgBattleActors = function() {
        return this._srpgBattleActors;
    };

    Game_Party.prototype.clearSrpgBattleActors = function() {
        this._srpgBattleActors = [];
    };

    Game_Party.prototype.pushSrpgBattleActors = function(actor) {
        this._srpgBattleActors.push(actor);
    };

    //プレイヤー移動時の処理
    var _SRPG_Game_Party_onPlayerWalk = Game_Party.prototype.onPlayerWalk;
    Game_Party.prototype.onPlayerWalk = function() {
        if ($gameSystem.isSRPGMode() == false) {
            return _SRPG_Game_Party_onPlayerWalk.call(this);
        }
    };

    // SRPG戦闘中にはmembersで呼び出す配列を変える
    var _SRPG_Game_Party_members = Game_Party.prototype.members;
    Game_Party.prototype.members = function() {
        if ($gameSystem.isSRPGMode() == true) {
            if ($gameSystem.isSubBattlePhase() === 'normal' || $gameSystem.isSubBattlePhase() === 'initialize') {
                return this.allMembers();
            } else {
                return this.battleMembers();
            }
        } else {
            return _SRPG_Game_Party_members.call(this);
        }
    };

    // SRPG戦闘中にはbattleMembersで呼び出す配列を変える
    var _SRPG_Game_Party_battleMembers = Game_Party.prototype.battleMembers;
    Game_Party.prototype.battleMembers = function() {
        if ($gameSystem.isSRPGMode() == true) {
            return this.SrpgBattleActors();
        } else {
            return _SRPG_Game_Party_battleMembers.call(this);
        }
    };

    // SRPG戦闘中にはallMembersで呼び出す配列を変える→メニューで戦闘参加アクターを呼び出す
    var _SRPG_Game_Party_allMembers = Game_Party.prototype.allMembers;
    Game_Party.prototype.allMembers = function() {
        if ($gameSystem.isSRPGMode() == true && $gameSystem.isSubBattlePhase() !== 'initialize') {
            var _list = [];
            for (var i = 0; i < $gameSystem.srpgAllActors().length; i++) {
                var actor = $gameSystem.EventToUnit($gameSystem.srpgAllActors()[i])[1];
                _list.push(actor);
            }
            return _list;
        } else {
            return _SRPG_Game_Party_allMembers.call(this);
        }
    };

    // セーブファイル用の処理
    var _SRPG_Game_Party_charactersForSavefile = Game_Party.prototype.charactersForSavefile;
    Game_Party.prototype.charactersForSavefile = function() {
        if ($gameSystem.isSRPGMode() == true) {
            return this.allMembers().map(function(actor) {
                return [actor.characterName(), actor.characterIndex()];
            });
        } else {
            return _SRPG_Game_Party_charactersForSavefile.call(this);
        }
    };

    var _SRPG_Game_Party_facesForSavefile = Game_Party.prototype.facesForSavefile;
    Game_Party.prototype.facesForSavefile = function() {
        if ($gameSystem.isSRPGMode() == true) {
            return this.allMembers().map(function(actor) {
                return [actor.faceName(), actor.faceIndex()];
            });
        } else {
            return _SRPG_Game_Party_facesForSavefile.call(this);
        }
    };

/*
    // アイテム・スキルの使用条件
    var _SRPG_Game_Party_canUse = Game_Party.prototype.canUse;
    Game_Party.prototype.canUse = function(item) {
        if ($gameSystem.isSRPGMode() == true) {
            var actor = $gameSystem.EventToUnit($gameTemp.activeEvent().eventId())[1];
            return actor.canUse(item);
        } else {
            return _SRPG_Game_Party_canUse.call(this, item);
        }
    };
*/
//====================================================================
// ●Game_Troop
//====================================================================
    // 初期化
    var _Game_Troop_initialize = Game_Troop.prototype.initialize
    Game_Troop.prototype.initialize = function() {
        _Game_Troop_initialize.call(this);
        this._srpgBattleEnemys = []; //SRPGモードの戦闘時に呼び出すメンバーを設定する（行動者と対象者）
    };

    Game_Troop.prototype.SrpgBattleEnemys = function() {
        return this._srpgBattleEnemys;
    };

    Game_Troop.prototype.clearSrpgBattleEnemys = function() {
        this._srpgBattleEnemys = [];
    };

    Game_Troop.prototype.pushSrpgBattleEnemys = function(enemy) {
        this._srpgBattleEnemys.push(enemy);
    };

    Game_Troop.prototype.pushMembers = function(enemy) {
        this._enemies.push(enemy);
    };

    // セットアップ
    var _SRPG_Game_Troop_setup = Game_Troop.prototype.setup;
    Game_Troop.prototype.setup = function(troopId) {
        if ($gameSystem.isSRPGMode() == true) {
            this.clear();
            this._troopId = troopId;
            this._enemies = [];
            for (var i = 0; i < this.SrpgBattleEnemys().length; i++) {
                var enemy = this.SrpgBattleEnemys()[i];
                enemy.setScreenXy(200 + 240 * i, Graphics.height / 2 + 48);
                this._enemies.push(enemy);
            }
            this.makeUniqueNames();
        } else {
            _SRPG_Game_Troop_setup.call(this, troopId);
        }
    };

    // EXPを返す
    var _SRPG_Game_Troop_expTotal = Game_Troop.prototype.expTotal;
    Game_Troop.prototype.expTotal = function() {
        if ($gameSystem.isSRPGMode() == true) {
            if (this.SrpgBattleEnemys() && this.SrpgBattleEnemys().length > 0) {
                if (this.isAllDead()) {
                    return _SRPG_Game_Troop_expTotal.call(this);
                } else {
                    var exp = 0;
                    for (var i = 0; i < this.members().length; i++) {
                        var enemy = this.members()[i];
                        exp += enemy.exp();
                    }
                    return Math.floor(exp * _srpgBattleExpRate);
                }
            } else {
                var actor = $gameParty.battleMembers()[0];
                var exp = actor.nextLevelExp() - actor.currentLevelExp();
                return Math.floor(exp * _srpgBattleExpRateForActors);
            }
        } else {
            return _SRPG_Game_Troop_expTotal.call(this);
        }
    };

//====================================================================
// ●Game_CharacterBase
//====================================================================
    //X座標を返す
    Game_CharacterBase.prototype.posX = function() {
        return this._x;
    };

    //Y座標を返す
    Game_CharacterBase.prototype.posY = function() {
        return this._y;
    };

    //イベントかどうかを返す
    Game_CharacterBase.prototype.isEvent = function() {
        return false;
    };

    //プレイヤーの移動速度を変える（自動移動中は高速化）
    var _SRPG_Game_CharacterBase_realMoveSpeed = Game_CharacterBase.prototype.realMoveSpeed;
    Game_CharacterBase.prototype.realMoveSpeed = function() {
        if ($gameSystem.isSRPGMode() == true && 
           ($gameTemp.isAutoMoveDestinationValid() == true || $gameTemp.isDestinationValid() == true)) {
            return 6;
        } else {
            return _SRPG_Game_CharacterBase_realMoveSpeed.call(this);
        }
    };

    //戦闘中はキャラクターがすり抜けて移動するように変更する
    var _SRPG_Game_CharacterBase_canPass = Game_CharacterBase.prototype.canPass;
    Game_CharacterBase.prototype.canPass = function(x, y, d) {
        if ($gameSystem.isSRPGMode() == true) {
            var x2 = $gameMap.roundXWithDirection(x, d);
            var y2 = $gameMap.roundYWithDirection(y, d);
            if (!$gameMap.isValid(x2, y2)) {
                return false;
            }
            return true;
        } else {
            return _SRPG_Game_CharacterBase_canPass.call(this, x, y, d);
        }
    };

    //対立陣営であれば通り抜けられない（移動範囲演算用） オブジェクトも一緒に処理する
    Game_CharacterBase.prototype.isSrpgCollidedWithEvents = function(x, y) {
        var events = $gameMap.eventsXyNt(x, y);
        return events.some(function(event) {
            if ((event.isType() === 'actor' && $gameTemp.activeEvent().isType() === 'enemy') ||
                (event.isType() === 'enemy' && $gameTemp.activeEvent().isType() === 'actor') ||
                (event.isType() === 'object' && event.characterName() != '') && !event.isErased()) {
                return true;
            } else {
                return false;
            }
        });
    };

    //移動可能かを判定する（移動範囲演算用）
    Game_CharacterBase.prototype.srpgMoveCanPass = function(x, y, d, tag) {
        var x2 = $gameMap.roundXWithDirection(x, d);
        var y2 = $gameMap.roundYWithDirection(y, d);
        if (!$gameMap.isValid(x2, y2)) {
            return false;
        }
        if (this.isSrpgCollidedWithEvents(x2, y2)) {
            return false;
        }
        if (this.isThrough()) {
            return true;
        }
        if (($gameMap.terrainTag(x2, y2) > 0 && $gameMap.terrainTag(x2, y2) <= tag) ||
            ($gameMap.terrainTag(x, y) > 0 && $gameMap.terrainTag(x, y) <= tag &&
             $gameMap.isPassable(x2, y2, this.reverseDir(d)))) {
            return true;
        }
        if (!this.isMapPassable(x, y, d)) {
            return false;
        }
        return true;
    };

    //対立陣営がいるか調べる（探索用移動範囲演算）
    Game_CharacterBase.prototype.isSrpgCollidedWithOpponentsUnit = function(x, y, d, route) {
        // 移動先に味方がいるか（1st, 2ndの識別）
        var flag = '1st';
        var events = $gameMap.eventsXyNt(x, y);
        events.some(function(event) {
            if ((event.isType() === 'actor' && $gameTemp.activeEvent().isType() === 'actor') ||
                (event.isType() === 'enemy' && $gameTemp.activeEvent().isType() === 'enemy') && !event.isErased()) {
                flag = '2nd';
            }
        });
        // 4方向に対立陣営のユニットがいるか
        var x2 = $gameMap.roundXWithDirection(x, d);
        var y2 = $gameMap.roundYWithDirection(y, d);
        var events = $gameMap.eventsXyNt(x2, y2);
        return events.some(function(event) {
            if ((event.isType() === 'actor' && $gameTemp.activeEvent().isType() === 'enemy') ||
                (event.isType() === 'enemy' && $gameTemp.activeEvent().isType() === 'actor') && !event.isErased()) {
                if (flag === '1st') {
                    if ($gameTemp.isSrpgPriorityTarget()) {
                        if ($gameTemp.isSrpgBestSearchRoute()[2] == '1st') {
                            if ($gameTemp.isSrpgPriorityTarget() == event &&
                                $gameTemp.isSrpgBestSearchRoute()[1].length > route.length) {
                                $gameTemp.setSrpgBestSearchRoute([event, route, flag]);
                            }
                        } else {
                            if ($gameTemp.isSrpgPriorityTarget() == event) {
                                $gameTemp.setSrpgBestSearchRoute([event, route, flag]);
                            }
                        }
                    } else {
                        if ($gameTemp.isSrpgBestSearchRoute()[2] == '1st') {
                            if ($gameTemp.isSrpgBestSearchRoute()[1].length > route.length) {
                                $gameTemp.setSrpgBestSearchRoute([event, route, flag]);
                            }
                        } else {
                            $gameTemp.setSrpgBestSearchRoute([event, route, flag]);
                        }
                    }
                } else if ($gameTemp.isSrpgBestSearchRoute()[2] != '1st') {
                    if ($gameTemp.isSrpgPriorityTarget()) {
                        if ($gameTemp.isSrpgPriorityTarget() == event &&
                            $gameTemp.isSrpgBestSearchRoute()[1].length > route.length) {
                            $gameTemp.setSrpgBestSearchRoute([event, route, flag]);
                        }
                    } else {
                        if ($gameTemp.isSrpgBestSearchRoute()[1].length > route.length) {
                            $gameTemp.setSrpgBestSearchRoute([event, route, flag]);
                        }
                    }
                }
            }
        });
    };

    //移動範囲の計算
    Game_CharacterBase.prototype.makeMoveTable = function(x, y, move, route, tag) {
        if (move <= 0) {
            return;
        }
        //上方向を探索
        if (route[route.length - 1] != 2) {
            if (this.srpgMoveCanPass(x, y, 8, tag)) {
                if ($gameTemp.MoveTable(x, $gameMap.roundY(y - 1))[0] < move - 1) {
                    if ($gameTemp.MoveTable(x, $gameMap.roundY(y - 1))[0] < 0) {
                        $gameTemp.pushMoveList([x, $gameMap.roundY(y - 1), false]);
                    }
                    $gameTemp.setMoveTable(x, $gameMap.roundY(y - 1), move - 1, route.concat(8));
                    this.makeMoveTable(x, $gameMap.roundY(y - 1), move - 1, route.concat(8), tag);
                }
            } else if ($gameTemp.isSrpgBestSearchFlag() == true) {
                this.isSrpgCollidedWithOpponentsUnit(x, y, 8, route);
            }
        }
        //右方向を探索
        if (route[route.length - 1] != 4) {
            if (this.srpgMoveCanPass(x, y, 6, tag)) {
                if ($gameTemp.MoveTable($gameMap.roundX(x + 1), y)[0] < move - 1) {
                    if ($gameTemp.MoveTable($gameMap.roundX(x + 1), y)[0] < 0) {
                        $gameTemp.pushMoveList([$gameMap.roundX(x + 1), y, false]);
                    }
                    $gameTemp.setMoveTable($gameMap.roundX(x + 1), y, move - 1, route.concat(6));
                    this.makeMoveTable($gameMap.roundX(x + 1), y, move - 1, route.concat(6), tag);
                }
            } else if ($gameTemp.isSrpgBestSearchFlag() == true) {
                this.isSrpgCollidedWithOpponentsUnit(x, y, 6, route);
            }
        }
        //左方向を探索
        if (route[route.length - 1] != 6) {
            if (this.srpgMoveCanPass(x, y, 4, tag)) {
                if ($gameTemp.MoveTable($gameMap.roundX(x - 1), y)[0] < move - 1) {
                    if ($gameTemp.MoveTable($gameMap.roundX(x - 1), y)[0] < 0) {
                        $gameTemp.pushMoveList([$gameMap.roundX(x - 1), y, false]);
                    }
                    $gameTemp.setMoveTable($gameMap.roundX(x - 1), y, move - 1, route.concat(4));
                    this.makeMoveTable($gameMap.roundX(x - 1), y, move - 1, route.concat(4), tag);
                }
            } else if ($gameTemp.isSrpgBestSearchFlag() == true) {
                this.isSrpgCollidedWithOpponentsUnit(x, y, 4, route);
            }
        }
        //下方向を探索
        if (route[route.length - 1] != 8) {
            if (this.srpgMoveCanPass(x, y, 2, tag)) {
                if ($gameTemp.MoveTable(x, $gameMap.roundY(y + 1))[0] < move - 1) {
                    if ($gameTemp.MoveTable(x, $gameMap.roundY(y + 1))[0] < 0) {
                        $gameTemp.pushMoveList([x, $gameMap.roundY(y + 1), false]);
                    }
                    $gameTemp.setMoveTable(x, $gameMap.roundY(y + 1), move - 1, route.concat(2));
                    this.makeMoveTable(x, $gameMap.roundY(y + 1), move - 1, route.concat(2), tag);
                }
            } else if ($gameTemp.isSrpgBestSearchFlag() == true) {
                this.isSrpgCollidedWithOpponentsUnit(x, y, 2, route);
            }
        }
    };

    //通行可能かを判定する（攻撃射程演算用）
    Game_CharacterBase.prototype.srpgRangeCanPass = function(x, y, d) {
        var x2 = $gameMap.roundXWithDirection(x, d);
        var y2 = $gameMap.roundYWithDirection(y, d);
        if (!$gameMap.isValid(x2, y2)) {
            return false;
        }
        if (_srpgRangeTerrainTag7 == 'true' && $gameMap.terrainTag(x2, y2) == 7) {
            return false;
        }
        return true;
    };
    
    //特殊射程の処理
    Game_CharacterBase.prototype.srpgRangeExtention = function(x, y, oriX, oriY, skill, range) {
        switch (skill && skill.meta.specialRange) {
        case 'king': 
            if ((Math.abs(x - oriX) <= range / 2) && (Math.abs(y - oriY) <= range / 2)) {
                return true;
            } else {
                return false;
            }
        case 'queen': 
            if ((x == oriX || y == oriY) || (Math.abs(x - oriX) == Math.abs(y - oriY))) {
                return true;
            } else {
                return false;
            }
        case 'rook': 
        case 'luke': 
            if (x == oriX || y == oriY) {
                return true;
            } else {
                return false;
            }
        case 'bishop': 
            if (Math.abs(x - oriX) == Math.abs(y - oriY)) {
                return true;
            } else {
                return false;
            }
        case 'knight': 
            if (!((x == oriX || y == oriY) || (Math.abs(x - oriX) == Math.abs(y - oriY)))) {
                return true;
            } else {
                return false;
            }
        default:
            return true;
        }
    };

    //攻撃射程の計算
    Game_CharacterBase.prototype.makeRangeTable = function(x, y, range, route, oriX, oriY, skill) {
        if (range <= 0) {
            return;
        }
        //上方向を探索
        if (route[route.length - 1] != 2) {
            if (this.srpgRangeCanPass(x, y, 8)) {
                //if ($gameTemp.RangeTable(x, $gameMap.roundY(y - 1))[0] < range - 1) {
                    if (this.srpgRangeExtention(x, $gameMap.roundY(y - 1), oriX, oriY, skill, range + route.length - 1) == true) {
                        if ($gameTemp.MoveTable(x, $gameMap.roundY(y - 1))[0] < 0 && $gameTemp.RangeTable(x, $gameMap.roundY(y - 1))[0] < 0) {
                            $gameTemp.pushRangeList([x, $gameMap.roundY(y - 1), true]);
                        }
                        $gameTemp.setRangeTable(x, $gameMap.roundY(y - 1), range - 1, route.concat(8));
                    }
                    this.makeRangeTable(x, $gameMap.roundY(y - 1), range - 1, route.concat(8), oriX, oriY, skill);
                //}
            }
        }
        //右方向を探索
        if (route[route.length - 1] != 4) {
            if (this.srpgRangeCanPass(x, y, 6)) {
                //if ($gameTemp.RangeTable($gameMap.roundX(x + 1), y)[0] < range - 1) {
                    if (this.srpgRangeExtention($gameMap.roundX(x + 1), y, oriX, oriY, skill, range + route.length - 1) == true) {
                        if ($gameTemp.MoveTable($gameMap.roundX(x + 1), y)[0] < 0 && $gameTemp.RangeTable($gameMap.roundX(x + 1), y)[0] < 0) {
                            $gameTemp.pushRangeList([$gameMap.roundX(x + 1), y, true]);
                        }
                        $gameTemp.setRangeTable($gameMap.roundX(x + 1), y, range - 1, route.concat(6));
                    }
                    this.makeRangeTable($gameMap.roundX(x + 1), y, range - 1, route.concat(6), oriX, oriY, skill);
                //}
            }
        }
        //左方向を探索
        if (route[route.length - 1] != 6) {
            if (this.srpgRangeCanPass(x, y, 4)) {
                //if ($gameTemp.RangeTable($gameMap.roundX(x - 1), y)[0] < range - 1) {
                    if (this.srpgRangeExtention($gameMap.roundX(x - 1), y, oriX, oriY, skill, range + route.length - 1) == true) {
                        if ($gameTemp.MoveTable($gameMap.roundX(x - 1), y)[0] < 0 && $gameTemp.RangeTable($gameMap.roundX(x - 1), y)[0] < 0) {
                            $gameTemp.pushRangeList([$gameMap.roundX(x - 1), y, true]);
                        }
                        $gameTemp.setRangeTable($gameMap.roundX(x - 1), y, range - 1, route.concat(4));
                    }
                    this.makeRangeTable($gameMap.roundX(x - 1), y, range - 1, route.concat(4), oriX, oriY, skill);
                //}
            }
        }
        //下方向を探索
        if (route[route.length - 1] != 8) {
            if (this.srpgRangeCanPass(x, y, 2)) {
                //if ($gameTemp.RangeTable(x, $gameMap.roundY(y + 1))[0] < range - 1) {
                    if (this.srpgRangeExtention(x, $gameMap.roundY(y + 1), oriX, oriY, skill, range + route.length - 1) == true) {
                        if ($gameTemp.MoveTable(x, $gameMap.roundY(y + 1))[0] < 0 && $gameTemp.RangeTable(x, $gameMap.roundY(y + 1))[0] < 0) {
                            $gameTemp.pushRangeList([x, $gameMap.roundY(y + 1), true]);
                        }
                        $gameTemp.setRangeTable(x, $gameMap.roundY(y + 1), range - 1, route.concat(2));
                    }
                    this.makeRangeTable(x, $gameMap.roundY(y + 1), range - 1, route.concat(2), oriX, oriY, skill);
                //}
            }
        }
    };
/*
    //移動可能かを判定する（イベント出現時用）
    Game_CharacterBase.prototype.srpgAppearCanPass = function(x, y, d) {
        var x2 = $gameMap.roundXWithDirection(x, d);
        var y2 = $gameMap.roundYWithDirection(y, d);
        if (!$gameMap.isValid(x2, y2)) {
            return false;
        }
        if (!this.isMapPassable(x, y, d)) {
            return false;
        }
        return true;
    };
*/

    //出現可能場所の計算
    Game_CharacterBase.prototype.makeAppearPoint = function(event, x, y, tag) {
        var events = $gameMap.eventsXyNt(x, y);
        if (events.length == 0 || (events.length == 1 && events[0] == event)) {
            return [x,y];
        }
        //上方向を探索
        if (this.srpgMoveCanPass(x, y, 8, tag)) {
            return this.makeAppearPoint(event, x, y - 1, tag);
        }
        //右方向を探索
        if (this.srpgMoveCanPass(x, y, 6, tag)) {
            return this.makeAppearPoint(event, x + 1, y, tag);
        }
        //左方向を探索
        if (this.srpgMoveCanPass(x, y, 4, tag)) {
            return this.makeAppearPoint(event, x - 1, y, tag);
        }
        //下方向を探索
        if (this.srpgMoveCanPass(x, y, 2, tag)) {
            return this.makeAppearPoint(event, x, y + 1, tag);
        }
    };

//====================================================================
// ●Game_Player
//====================================================================
    //プレイヤーの画像を変更する
    var _SRPG_Game_Player_refresh = Game_Player.prototype.refresh;
    Game_Player.prototype.refresh = function() {
        if ($gameSystem.isSRPGMode() == true) {
            var characterName = _srpgSet;
            var characterIndex = 0;
            this.setImage(characterName, characterIndex);
            this._followers.refresh();
        } else {
            _SRPG_Game_Player_refresh.call(this);
        }
    };

    //プレイヤーの自動移動を設定する
    var _SRPG_Game_Player_moveByInput = Game_Player.prototype.moveByInput;
    Game_Player.prototype.moveByInput = function() {
        if ($gameSystem.isSRPGMode() == true && $gameTemp.isAutoMoveDestinationValid() == true &&
            !this.isMoving()) {
            var x = $gameTemp.autoMoveDestinationX() - this.x;
            var y = $gameTemp.autoMoveDestinationY() - this.y;
            if ($gameMap.isLoopHorizontal() == true) {
    　　        var minDisX = Math.abs($gameTemp.autoMoveDestinationX() - this.x);
                var destX = $gameTemp.autoMoveDestinationX() > this.x ? $gameTemp.autoMoveDestinationX() - $gameMap.width() : $gameTemp.autoMoveDestinationX() + $gameMap.width();
                var disX = Math.abs(destX - this.x);
                x = minDisX < disX ? x : x * -1;
            }
            if ($gameMap.isLoopVertical() == true) {
        　　    var minDisY = Math.abs($gameTemp.autoMoveDestinationY() - this.y);
                var destY = $gameTemp.autoMoveDestinationY() > this.y ? $gameTemp.autoMoveDestinationY() - $gameMap.height() : $gameTemp.autoMoveDestinationY() + $gameMap.height();
                var disY = Math.abs(destY - this.y);
                y = minDisY < disY ? y : y * -1;
            }
            if (x < 0) {
                if (y < 0) {
                    this.moveDiagonally(4, 8);
                } else if (y == 0) {
                    this.moveStraight(4);
                } else if (y > 0) {
                    this.moveDiagonally(4, 2);
                }
            } else if (x == 0) {
                if (y < 0) {
                    this.moveStraight(8);
                } else if (y == 0) {
                    $gameTemp.setAutoMoveDestinationValid(false);
                    $gameTemp.setAutoMoveDestination(-1, -1);
                } else if (y > 0) {
                    this.moveStraight(2);
                }
            } else if (x > 0) {
                if (y < 0) {
                    this.moveDiagonally(6, 8);
                } else if (y == 0) {
                    this.moveStraight(6);
                } else if (y > 0) {
                    this.moveDiagonally(6, 2);
                }
            }
        } else {
            _SRPG_Game_Player_moveByInput.call(this);
        }
    };

/* 戦闘中のイベント起動に関する処理
 * 戦闘中、通常のイベント内容は起動しないようにする
 * 戦闘中はユニットが選択されたと判断して、移動範囲演算とステータスの表示を行う(行動可能アクターなら行動する)。
*/
    //戦闘中、ユニット上で決定キーが押された時の処理
    var _SRPG_Game_Player_startMapEvent = Game_Player.prototype.startMapEvent;
    Game_Player.prototype.startMapEvent = function(x, y, triggers, normal) {
        if ($gameSystem.isSRPGMode() == true) {
            if (!$gameMap.isEventRunning() && $gameSystem.isBattlePhase() === 'actor_phase') {
                if ($gameSystem.isSubBattlePhase() === 'normal') {
                    $gameMap.eventsXy(x, y).forEach(function(event) {
                        if (event.isTriggerIn(triggers) && !event.isErased()) {
                            if (event.isType() === 'actor') {
                                SoundManager.playOk();
                                $gameTemp.setActiveEvent(event);
                                $gameSystem.srpgMakeMoveTable(event);
                                var battlerArray = $gameSystem.EventToUnit(event.eventId());
                                if (battlerArray[1].canInput() == true) {
                                    $gameParty.pushSrpgBattleActors(battlerArray[1]);
                                    $gameTemp.reserveOriginalPos($gameTemp.activeEvent().posX(), $gameTemp.activeEvent().posY());
                                    $gameSystem.setSrpgActorCommandStatusWindowNeedRefresh(battlerArray);
                                    $gameSystem.setSubBattlePhase('actor_move');
                                } else {
                                    $gameSystem.setSrpgStatusWindowNeedRefresh(battlerArray);
                                    $gameSystem.setSubBattlePhase('status_window');
                                }
                                return;
                            } else if (event.isType() === 'enemy') {
                                SoundManager.playOk();
                                $gameTemp.setActiveEvent(event);
                                $gameSystem.srpgMakeMoveTable(event);
                                var battlerArray = $gameSystem.EventToUnit(event.eventId());
                                $gameSystem.setSrpgStatusWindowNeedRefresh(battlerArray);
                                $gameSystem.setSubBattlePhase('status_window');
                                return;
                            } else if (event.isType() === 'playerEvent') {
                                if (event.pageIndex() >= 0) event.start();
                                return;
                            }
                        }
                    });
                } else if ($gameSystem.isSubBattlePhase() === 'actor_target') {
                    $gameMap.eventsXy(x, y).forEach(function(event) {
                        if (event.isTriggerIn(triggers) && !event.isErased()) {
                            if (event.isType() == 'actor' || event.isType() == 'enemy') {
                                var actionBattlerArray = $gameSystem.EventToUnit($gameTemp.activeEvent().eventId());
                                var targetBattlerArray = $gameSystem.EventToUnit(event.eventId());
                                if (targetBattlerArray[0] === 'actor' && actionBattlerArray[1].currentAction().isForFriend() ||
                                    targetBattlerArray[0] === 'enemy' && actionBattlerArray[1].currentAction().isForOpponent()) {
                                    $gameTemp.setSrpgDistance($gameSystem.unitDistance($gameTemp.activeEvent(), event));
                                    var skill = actionBattlerArray[1].currentAction().item();
                                    var range = actionBattlerArray[1].srpgSkillRange(skill);
                                    $gameTemp.setTargetEvent(event);
                                    $gameSystem.setSubBattlePhase('battle_window');
                                    if (_srpgPredictionWindowMode == 3 && !actionBattlerArray[1].canUse(skill)) {
                                        $gameTemp.setSrpgDistance(0);
                                        $gameTemp.clearTargetEvent();
                                        $gameSystem.setSubBattlePhase('actor_target');
                                        return;
                                    }
                                    SoundManager.playOk();
                                    $gameSystem.clearSrpgActorCommandStatusWindowNeedRefresh();
                                    if (_srpgPredictionWindowMode != 3) $gameSystem.setSrpgStatusWindowNeedRefresh(actionBattlerArray);
                                    $gameSystem.setSrpgBattleWindowNeedRefresh(actionBattlerArray, targetBattlerArray);
                                }
                            }
                        }
                    });
                }
            }
        } else {
            _SRPG_Game_Player_startMapEvent.call(this, x, y, triggers, normal);
        }
    };

    //戦闘中、サブフェーズの状況に応じてプレイヤーの移動を制限する
    var _SRPG_Game_Player_canMove = Game_Player.prototype.canMove;
    Game_Player.prototype.canMove = function() {
        if ($gameSystem.isSRPGMode() == true) {
            if ($gameSystem.srpgWaitMoving() == true ||
                $gameSystem.isSubBattlePhase() === 'status_window' ||
                $gameSystem.isSubBattlePhase() === 'actor_command_window' ||
                $gameSystem.isSubBattlePhase() === 'battle_window' ||
                $gameSystem.isBattlePhase() === 'auto_actor_phase' ||
                $gameSystem.isBattlePhase() === 'enemy_phase') {
                return false;
            }
        }
        return _SRPG_Game_Player_canMove.call(this);
    };

    //戦闘中、サブフェーズの状況に応じて決定キー・タッチの処理を変える
    var _SRPG_Game_Player_triggerAction = Game_Player.prototype.triggerAction;
    Game_Player.prototype.triggerAction = function() {
        if ($gameSystem.isSRPGMode() == true) {
            if ($gameSystem.srpgWaitMoving() == true ||
                $gameTemp.isAutoMoveDestinationValid() == true ||
                $gameSystem.isSubBattlePhase() === 'actor_command_window' ||
                $gameSystem.isSubBattlePhase() === 'battle_window' ||
                $gameSystem.isBattlePhase() === 'auto_actor_phase' ||
                $gameSystem.isBattlePhase() === 'enemy_phase') {
                return false;
            } else if ($gameSystem.isSubBattlePhase() === 'status_window') {
                if (Input.isTriggered('ok') || TouchInput.isTriggered()) {
                    var battlerArray = $gameSystem.EventToUnit($gameTemp.activeEvent().eventId());
                    var type = battlerArray[0];
                    var battler = battlerArray[1];
                    $gameSystem.clearSrpgStatusWindowNeedRefresh();
                    SoundManager.playCancel();
                    $gameTemp.clearActiveEvent();
                    $gameSystem.setSubBattlePhase('normal');
                    $gameTemp.clearMoveTable();
                    return true;
                }
                return false;
            } else if ($gameSystem.isSubBattlePhase() === 'actor_move') {
                if (Input.isTriggered('ok') || TouchInput.isTriggered()) {
                    var list = $gameTemp.moveList();
                    for (var i = 0; i < list.length; i++) {
                        var pos = list[i];
                        if (pos[2] == false && pos[0] == this._x && pos[1] == this._y) {
                            if ($gameSystem.areTheyNoUnits(this._x, this._y, 'actor')) {
                                SoundManager.playOk();
                                var route = $gameTemp.MoveTable(pos[0], pos[1])[1];
                                var event = $gameTemp.activeEvent();
                                $gameSystem.setSrpgWaitMoving(true);
                                event.srpgMoveRouteForce(route);
                                var battlerArray = $gameSystem.EventToUnit(event.eventId());
                                battlerArray[1].srpgMakeNewActions();
                                $gameSystem.setSrpgActorCommandWindowNeedRefresh(battlerArray);
                                $gameSystem.setSubBattlePhase('actor_command_window');
                            } else {
                                SoundManager.playBuzzer();
                            }
                        }
                    }
                    return true;
                }
                return false;
            } else {
                return _SRPG_Game_Player_triggerAction.call(this);
            }
        } else {
            return _SRPG_Game_Player_triggerAction.call(this);
        }
    };

    //戦闘中、隣接するイベントへの起動判定は行わない
    var _SRPG_Game_Player_checkEventTriggerThere = Game_Player.prototype.checkEventTriggerThere;
    Game_Player.prototype.checkEventTriggerThere = function(triggers) {
        if ($gameSystem.isSRPGMode() == false) {
            _SRPG_Game_Player_checkEventTriggerThere.call(this, triggers);
        }
    };

    //戦闘中、接触による起動判定は行わない
    var _SRPG_Game_Player_checkEventTriggerTouch = Game_Player.prototype.checkEventTriggerTouch;
    Game_Player.prototype.checkEventTriggerTouch = function(x, y) {
        if ($gameSystem.isSRPGMode() == false) {
            _SRPG_Game_Player_checkEventTriggerTouch.call(this, x, y);
        }
    };

//====================================================================
// ●Game_Follower
//====================================================================
    //戦闘中、フォロワーが表示されないようにする
    var _SRPG_Game_Follower_refresh = Game_Follower.prototype.refresh;
    Game_Follower.prototype.refresh = function() {
        if ($gameSystem.isSRPGMode() == true) {
            this.setImage('', 0);
        } else {
            _SRPG_Game_Follower_refresh.call(this);
        }
    };

//====================================================================
// ●Game_Event
//====================================================================
    //初期化処理
    var _SRPG_Game_Event_initMembers = Game_Event.prototype.initMembers;
    Game_Event.prototype.initMembers = function() {
        _SRPG_Game_Event_initMembers.call(this);
        this._srpgForceRoute = [];
        this._srpgEventType = '';
    };

    //ゲームページを返す
    Game_Event.prototype.pageIndex = function() {
        return this._pageIndex;
    };

    //イベントかどうかを返す
    Game_Event.prototype.isEvent = function() {
        return true;
    };

    //消去済みかどうかを返す
    Game_Event.prototype.isErased = function() {
        return this._erased;
    };

    //消去済みフラグを消す
    Game_Event.prototype.appear = function() {
        this._erased = false;
        this.refresh();
    };

    //タイプを設定する
    Game_Event.prototype.setType = function(type) {
        this._srpgEventType = type;
    };

    //タイプを返す
    Game_Event.prototype.isType = function() {
        return this._srpgEventType;
    };

    // アクター・エネミーデータを元にイベントのグラフィックを変更する＋戦闘以外では元に戻す
    Game_Event.prototype.refreshImage = function() {
        if ($gameSystem.isSRPGMode() == true) {
            var battlerArray = $gameSystem.EventToUnit(this._eventId);
            if (!battlerArray || this.isErased()) {
                return ;
            }
            var type = battlerArray[0];
            var unit = battlerArray[1];
            if (type === 'actor') {
                this.setImage(unit.characterName(), unit.characterIndex());
            } else if (type === 'enemy') {
                var characterName = unit.enemy().meta.characterName;
                var characterIndex = Number(unit.enemy().meta.characterIndex);
                this.setImage(characterName, characterIndex);
            } else if (type === 'null') {
                this.erase();
            }
        } else {
            if (this.isErased()) {
                this.appear();
            }
            var page = this.page();
            if (image) {
                var image = page.image;
                if (image.tileId > 0) {
                    this.setTileImage(image.tileId);
                } else {
                    this.setImage(image.characterName, image.characterIndex);
                }
                this.setDirection(image.direction);
                this.setPattern(image.pattern);
            }
        }
    };

    //移動ルートを設定する
    Game_Event.prototype.srpgMoveRouteForce = function(array) {
        this._srpgForceRoute = [];
        for (var i = 1; i < array.length; i++) {
            this._srpgForceRoute.push(array[i]);
        }
        this._srpgForceRoute.push(0);
    };

    //設定されたルートに沿って移動する
    var _SRPG_Game_Event_updateStop = Game_Event.prototype.updateStop;
    Game_Event.prototype.updateStop = function() {
        if ($gameSystem.isSRPGMode() == true && this._srpgForceRoute.length > 0) {
            if (!this.isMoving()) {
                var command = this._srpgForceRoute[0];
                this._srpgForceRoute.shift();
                if (command == 0) {
                    this._srpgForceRoute = [];
                    $gameSystem.setSrpgWaitMoving(false);
                } else {
                    this.moveStraight(command);
                }
            }
        } else {
            _SRPG_Game_Event_updateStop.call(this);
        }
    };

//====================================================================
// ●Game_Map
//====================================================================
    //アクター・エネミーデータに合わせてグラフィックを変更する
    Game_Map.prototype.setEventImages = function() {
        this.events().forEach(function(event) {
            event.refreshImage();
        });
    };

    //最大のイベントＩＤを返す
    Game_Map.prototype.isMaxEventId = function() {
        var maxId = 0;
        this.events().forEach(function(event) {
            if (event.eventId() > maxId) {
                maxId = event.eventId();
            }
        });
        return maxId;
    };

    //イベントの実行順序を変更する（実行待ちのイベントを優先する）
    var _SRPG_Game_Map_setupStartingMapEvent = Game_Map.prototype.setupStartingMapEvent;
    Game_Map.prototype.setupStartingMapEvent = function() {
        if ($gameTemp.isSrpgEventList()) {
            var event = $gameTemp.shiftSrpgEventList();
            if (event.isStarting()) {
                event.clearStartingFlag();
                this._interpreter.setup(event.list(), event.eventId());
                return true;
            }
        }
        return _SRPG_Game_Map_setupStartingMapEvent.call(this);
    };

//====================================================================
// ●Game_Interpreter
//====================================================================
// イベントＩＤをもとに、ユニット間の距離をとる
Game_Interpreter.prototype.EventDistance = function(variableId, eventId1, eventId2) {
    var event1 = $gameMap.event(eventId1);
    var event2 = $gameMap.event(eventId2);
    if (event1 && event2 && !event1.isErased() && !event2.isErased()) {
        var value = $gameSystem.unitDistance(event1, event2);
        $gameVariables.setValue(variableId, value);
    } else {
        $gameVariables.setValue(variableId, 999);
    }
    return true;
};

// アクターＩＤをもとに、ユニット間の距離をとる
Game_Interpreter.prototype.ActorDistance = function(variableId, actorId1, actorId2) {
    var eventId1 = $gameSystem.ActorToEvent(actorId1);
    var eventId2 = $gameSystem.ActorToEvent(actorId2);
    this.EventDistance(variableId, eventId1, eventId2);
    return true;
};

// 特定のＩＤのイベントと全アクターの中で最短の距離をとる
Game_Interpreter.prototype.fromActorMinimumDistance = function(variableId, eventId) {
    var minDistance = 999;
    var event1 = $gameMap.event(eventId);
    $gameMap.events().forEach(function(event) {
        if (event.isType() === 'actor') {
            var event2 = $gameMap.event(event.eventId());
            if (event1 && event2 && !event1.isErased() && !event2.isErased()) {
                var value = $gameSystem.unitDistance(event1, event2);
                if (value < minDistance) {
                    minDistance = value;
                }
            }
        }
    });
    $gameVariables.setValue(variableId, minDistance);
    return true;
};

// 新規アクターを追加する（増援）
Game_Interpreter.prototype.addActor = function(eventId, actorId) {
    var actor_unit = $gameActors.actor(actorId);
    var event = $gameMap.event(eventId);
    if (actor_unit && event) {
        $gameSystem.pushSrpgAllActors(event.eventId());
        actor_unit.initTp(); //TPを初期化
        var bitmap = ImageManager.loadFace(actor_unit.faceName()); //顔グラフィックをプリロードする
        var oldValue = $gameVariables.value(_existActorVarID);
        $gameVariables.setValue(_existActorVarID, oldValue + 1);
        $gameSystem.setEventToUnit(event.eventId(), 'actor', actor_unit.actorId());
        event.setType('actor');
        var xy = event.makeAppearPoint(event, event.posX(), event.posY(), actor_unit.srpgThroughTag());
        event.setPosition(xy[0], xy[1]);
        $gameMap.setEventImages();
    }
    return true;
};

// 新規エネミーを追加する（増援）
Game_Interpreter.prototype.addEnemy = function(eventId, enemyId) {
    var enemy_unit = new Game_Enemy(enemyId, 0, 0);
    var event = $gameMap.event(eventId);
    if (enemy_unit && event) {
        enemy_unit.initTp(); //TPを初期化
        var faceName = enemy_unit.enemy().meta.faceName; //顔グラフィックをプリロードする
        if (faceName) {
            var bitmap = ImageManager.loadFace(faceName);
        } else {
            if ($gameSystem.isSideView()) {
                var bitmap = ImageManager.loadSvEnemy(enemy_unit.battlerName(), enemy_unit.battlerHue());
            } else {
                var bitmap = ImageManager.loadEnemy(enemy_unit.battlerName(), enemy_unit.battlerHue());
            }
        }
        var oldValue = $gameVariables.value(_existEnemyVarID);
        $gameVariables.setValue(_existEnemyVarID, oldValue + 1);
        $gameSystem.setEventToUnit(event.eventId(), 'enemy', enemy_unit);
        event.setType('enemy');
        var xy = event.makeAppearPoint(event, event.posX(), event.posY(), enemy_unit.srpgThroughTag());
        event.setPosition(xy[0], xy[1]);
        $gameMap.setEventImages();
    }
    return true;
};

// 指定した座標にプレイヤーを移動する
Game_Interpreter.prototype.playerMoveTo = function(x, y) {
    $gameTemp.setAutoMoveDestinationValid(true);
    $gameTemp.setAutoMoveDestination(x, y);
    return true;
};

// 指定したイベントの戦闘モードを設定する
Game_Interpreter.prototype.setBattleMode = function(eventId, mode) {
    var battlerArray = $gameSystem.EventToUnit(eventId);
    if (battlerArray && (battlerArray[0] === 'actor' || battlerArray[0] === 'enemy')) {
        battlerArray[1].setBattleMode(mode);
    }
    return true;
};

// 指定したイベントのターゲットＩＤを設定する（戦闘モードが'aimingEvent'または'aimingActor'でのみ機能する）
Game_Interpreter.prototype.setTargetId = function(eventId, targetId) {
    var battlerArray = $gameSystem.EventToUnit(eventId);
    if (battlerArray && (battlerArray[0] === 'actor' || battlerArray[0] === 'enemy')) {
        battlerArray[1].setTargetId(targetId);
    }
    return true;
};

// 指定したイベントが戦闘不能か指定したスイッチに返す
Game_Interpreter.prototype.isUnitDead = function(switchId, eventId) {
    $gameSwitches.setValue(switchId, false);
    var battlerArray = $gameSystem.EventToUnit(eventId);
    if (battlerArray && (battlerArray[0] === 'actor' || battlerArray[0] === 'enemy')) {
        $gameSwitches.setValue(switchId, battlerArray[1].isDead());
    }
    return true;
};

// 指定した座標のイベントＩＤを取得する
Game_Interpreter.prototype.isEventIdXy = function(variableId, x, y) {
    $gameVariables.setValue(variableId, 0);
    $gameMap.eventsXy(x, y).forEach(function(event) {
        var battlerArray = $gameSystem.EventToUnit(event.eventId());
        if (battlerArray && (battlerArray[0] === 'actor' || battlerArray[0] === 'enemy')) {
            $gameVariables.setValue(variableId, event.eventId());
        }
    });
    return true;
};

// 指定したリージョンID上に味方ユニットがいるか判定する
Game_Interpreter.prototype.checkRegionId = function(switcheId, regionId) {
    $gameSwitches.setValue(switcheId, false);
    $gameMap.events().forEach(function(event) {
        if (event.isType() === 'actor') {
            if ($gameMap.regionId(event.posX(), event.posY()) == regionId) {
                $gameSwitches.setValue(switcheId, true);
            }
        }
    });
};

// 指定したイベントＩＤのユニットを全回復する
Game_Interpreter.prototype.unitRecoverAll = function(eventId) {
    var battlerArray = $gameSystem.EventToUnit(eventId);
    if (battlerArray && (battlerArray[0] === 'actor' || battlerArray[0] === 'enemy')) {
        if (battlerArray[1].isAlive()) {
            battlerArray[1].recoverAll();
        }
    }
    return true;
};

// 指定したイベントＩＤのユニットを復活する
Game_Interpreter.prototype.unitRevive = function(eventId) {
    var battlerArray = $gameSystem.EventToUnit(eventId);
    var event = $gameMap.event(eventId);
    if (battlerArray && (battlerArray[0] === 'actor' || battlerArray[0] === 'enemy')) {
        if (battlerArray[1].isAlive()) {
            return;
        }
        battlerArray[1].removeState(battlerArray[1].deathStateId());
        if (battlerArray[0] === 'actor') {
            var oldValue = $gameVariables.value(_existActorVarID);
            $gameVariables.setValue(_existActorVarID, oldValue + 1);
        } else {
            var oldValue = $gameVariables.value(_existEnemyVarID);
            $gameVariables.setValue(_existEnemyVarID, oldValue + 1);
        }
        var xy = event.makeAppearPoint(event, event.posX(), event.posY(), battlerArray[1].srpgThroughTag());
        event.setPosition(xy[0], xy[1]);
        event.appear();
        $gameMap.setEventImages();
    }
};

// 指定したイベントＩＤのユニットを指定したステートにする
Game_Interpreter.prototype.unitAddState = function(eventId, stateId) {
    var battlerArray = $gameSystem.EventToUnit(eventId);
    var event = $gameMap.event(eventId);
    if (battlerArray && event && (battlerArray[0] === 'actor' || battlerArray[0] === 'enemy')) {
        var alreadyDead = battlerArray[1].isDead();
        battlerArray[1].addState(stateId);
        if (battlerArray[1].isDead() && !alreadyDead) {
            if (!event.isErased()) {
                event.erase();
                if (battlerArray[0] === 'actor') {
                    var oldValue = $gameVariables.value(_existActorVarID);
                    $gameVariables.setValue(_existActorVarID, oldValue - 1);
                } else if (battlerArray[0] === 'enemy') {
                    var oldValue = $gameVariables.value(_existEnemyVarID);
                    $gameVariables.setValue(_existEnemyVarID, oldValue - 1);
                }
            }
        }
        battlerArray[1].clearResult();
    }
    return true;
};

// ターン終了を行う（メニューの「ターン終了」と同じ）
    Game_Interpreter.prototype.turnEnd = function() {
        $gameTemp.setTurnEndFlag(true);
        return true;
    };

// プレイヤーの操作を受け付けるかの判定（操作できるサブフェーズか？）
    Game_Interpreter.prototype.isSubPhaseNormal = function(id) {
        if ($gameSystem.isBattlePhase() === 'actor_phase' && $gameSystem.isSubBattlePhase() === 'normal') {
            $gameSwitches.setValue(id, true);
        } else {
            $gameSwitches.setValue(id, false);
        }
        return true;
    };

//====================================================================
// ●Sprite_Actor
//====================================================================
    //アクタースプライトの基準位置
    var _SRPG_Sprite_Actor_setActorHome = Sprite_Actor.prototype.setActorHome;
    Sprite_Actor.prototype.setActorHome = function(index) {
        if ($gameSystem.isSRPGMode() == true) {
            this.setHome(Graphics.width - 216 - index * 240, Graphics.height / 2 + 48);
        } else {
            _SRPG_Sprite_Actor_setActorHome.call(this, index);
        }
    };

//====================================================================
// ●Sprite_Character
//====================================================================
    //ターン終了したユニットか返す
    Sprite_Character.prototype.isTurnEndUnit = function() {
        if (this._character.isEvent() == true) {
            var battlerArray = $gameSystem.EventToUnit(this._character.eventId());
            if (battlerArray) {
                if (battlerArray[0] === 'actor' || battlerArray[0] === 'enemy') {
                    return battlerArray[1].srpgTurnEnd();
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    };

    //キャラクタービットマップの更新
    var _SRPG_Sprite_Character_setCharacterBitmap = Sprite_Character.prototype.setCharacterBitmap;
    Sprite_Character.prototype.setCharacterBitmap = function() {
        _SRPG_Sprite_Character_setCharacterBitmap.call(this);
        this._turnEndBitmap = ImageManager.loadCharacter(_srpgSet);
    };

    //キャラクターフレームの更新
    var _SRPG_Sprite_Character_updateCharacterFrame = Sprite_Character.prototype.updateCharacterFrame;
    Sprite_Character.prototype.updateCharacterFrame = function() {
        _SRPG_Sprite_Character_updateCharacterFrame.call(this);
        if ($gameSystem.isSRPGMode() == true && this._character.isEvent() == true) {
            var battlerArray = $gameSystem.EventToUnit(this._character.eventId());
            if (battlerArray) {
                var pw = this._turnEndBitmap.width / 12;
                var ph = this._turnEndBitmap.height / 8;
                if ((battlerArray[0] === 'actor' || battlerArray[0] === 'enemy') &&
                    battlerArray[1].isAlive()) {
                    if (battlerArray[1].isRestricted()) {
                        var sx = (6 + this.characterPatternX()) * pw;
                        var sy = (0 + this.characterPatternY()) * ph;
                        this.createTurnEndSprites();
                        this._turnEndSprite.bitmap = this._turnEndBitmap;
                        this._turnEndSprite.visible = true;
                        this._turnEndSprite.setFrame(sx, sy, pw, ph);
                    } else if (this.isTurnEndUnit() == true) {
                        var sx = (3 + this.characterPatternX()) * pw;
                        var sy = (0 + this.characterPatternY()) * ph;
                        this.createTurnEndSprites();
                        this._turnEndSprite.bitmap = this._turnEndBitmap;
                        this._turnEndSprite.visible = true;
                        this._turnEndSprite.setFrame(sx, sy, pw, ph);
                    } else if (battlerArray[1].isAutoBattle()) {
                        var sx = (9 + this.characterPatternX()) * pw;
                        var sy = (0 + this.characterPatternY()) * ph;
                        this.createTurnEndSprites();
                        this._turnEndSprite.bitmap = this._turnEndBitmap;
                        this._turnEndSprite.visible = true;
                        this._turnEndSprite.setFrame(sx, sy, pw, ph);
                    } else if (this._turnEndSprite) {
                        this._turnEndSprite.visible = false;
                    }
                } else if (this._turnEndSprite) {
                    this._turnEndSprite.visible = false;
                }
            }
        } else if (this._turnEndSprite) {
            this.removeChild(this._turnEndSprite);
            this._turnEndSprite = null;
        }
    };

    //ターン終了の表示を作る
    Sprite_Character.prototype.createTurnEndSprites = function() {
        if (!this._turnEndSprite) {
            this._turnEndSprite = new Sprite();
            this._turnEndSprite.anchor.x = 0.5;
            this._turnEndSprite.anchor.y = 1;
            this.addChild(this._turnEndSprite);
        }
    };

//====================================================================
// ●Sprite_SrpgMoveTile
//====================================================================
    window.Sprite_SrpgMoveTile = function() {
        this.initialize.apply(this, arguments);
    }

    Sprite_SrpgMoveTile.prototype = Object.create(Sprite.prototype);
    Sprite_SrpgMoveTile.prototype.constructor = Sprite_SrpgMoveTile;

    Sprite_SrpgMoveTile.prototype.initialize = function() {
        Sprite.prototype.initialize.call(this);
        this.createBitmap();
        this._frameCount = 0;
        this._posX = -1;
        this._posY = -1;
        this.z = 0;
        this.visible = false;
    };

    Sprite_SrpgMoveTile.prototype.isThisMoveTileValid = function() {
        return this._posX >= 0 && this._posY >= 0;
    }

    Sprite_SrpgMoveTile.prototype.setThisMoveTile = function(x, y, attackFlag) {
        this._frameCount = 0;
        this._posX = x;
        this._posY = y;
        if (attackFlag == true) {
            this.bitmap.fillAll('red');
        } else {
            this.bitmap.fillAll('blue');
        }
    }

    Sprite_SrpgMoveTile.prototype.clearThisMoveTile = function() {
        this._frameCount = 0;
        this._posX = -1;
        this._posY = -1;
    }

    Sprite_SrpgMoveTile.prototype.update = function() {
        Sprite.prototype.update.call(this);
        if (this.isThisMoveTileValid()){
            this.updatePosition();
            this.updateAnimation();
            this.visible = true;
        } else {
            this.visible = false;
        }
    };

    Sprite_SrpgMoveTile.prototype.createBitmap = function() {
        var tileWidth = $gameMap.tileWidth();
        var tileHeight = $gameMap.tileHeight();
        this.bitmap = new Bitmap(tileWidth, tileHeight);
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.blendMode = Graphics.BLEND_ADD;
    };

    Sprite_SrpgMoveTile.prototype.updatePosition = function() {
        var tileWidth = $gameMap.tileWidth();
        var tileHeight = $gameMap.tileHeight();
        this.x = ($gameMap.adjustX(this._posX) + 0.5) * tileWidth;
        this.y = ($gameMap.adjustY(this._posY) + 0.5) * tileHeight;
    };

    Sprite_SrpgMoveTile.prototype.updateAnimation = function() {
        this._frameCount++;
        this._frameCount %= 40;
        this.opacity = (40 - this._frameCount) * 3;
    };

//====================================================================
// ●Spriteset_Map
//====================================================================
    var _SRPG_Spriteset_Map_createTilemap = Spriteset_Map.prototype.createTilemap;
    Spriteset_Map.prototype.createTilemap = function() {
        _SRPG_Spriteset_Map_createTilemap.call(this);
        this._srpgMoveTile = [];
        for (var i = 0; i < $gameSystem.spriteMoveTileMax(); i++) {
            this._srpgMoveTile[i] = new Sprite_SrpgMoveTile();
            this._tilemap.addChild(this._srpgMoveTile[i]);
        }
    };

    var _SRPG_Spriteset_Map_update = Spriteset_Map.prototype.update;
    Spriteset_Map.prototype.update = function() {
        _SRPG_Spriteset_Map_update.call(this);
        this.updateSrpgMoveTile();
    };

    Spriteset_Map.prototype.updateSrpgMoveTile = function() {
        if ($gameTemp.resetMoveList() == true) {
            for (var i = 0; i < $gameSystem.spriteMoveTileMax(); i++) {
                this._srpgMoveTile[i].clearThisMoveTile();
            }
            $gameTemp.setResetMoveList(false);
        }
        if ($gameTemp.isMoveListValid()) {
            if (!this._srpgMoveTile[0].isThisMoveTileValid()) {
                var list = $gameTemp.moveList();
                for (var i = 0; i < list.length; i++) {
                    var pos = list[i];
                    this._srpgMoveTile[i].setThisMoveTile(pos[0], pos[1], pos[2]);
                }
            }
        } else {
            if (this._srpgMoveTile[0].isThisMoveTileValid()) {
                for (var i = 0; i < $gameSystem.spriteMoveTileMax(); i++) {
                    this._srpgMoveTile[i].clearThisMoveTile();
                }
            }
        }
    };

//====================================================================
// ●Window_Base
//====================================================================
    // EXPの割合を表示する
    Window_Base.prototype.drawSrpgExpRate = function(actor, x, y, width) {
        width = width || 120;
        var color1 = this.hpGaugeColor1();
        var color2 = this.hpGaugeColor2();
        this.drawGauge(x, y, width, actor.expRate(), color1, color2);
    };

    Window_Base.prototype.drawEnemyFaceWhenNoFace = function(enemy, x, y, width, height) {
        width = width || Window_Base._faceWidth;
        height = height || Window_Base._faceHeight;
        if ($gameSystem.isSideView()) {
            var bitmap = ImageManager.loadSvEnemy(enemy.battlerName(), enemy.battlerHue());
        } else {
            var bitmap = ImageManager.loadEnemy(enemy.battlerName(), enemy.battlerHue());
        }
        var pw = Window_Base._faceWidth;
        var ph = Window_Base._faceHeight;
        var sw = Math.min(width, pw, bitmap.width);
        var sh = Math.min(height, ph, bitmap.height);
        var dx = Math.floor(x + Math.max(width - bitmap.width, 0) / 2);
        var dy = Math.floor(y + Math.max(height - bitmap.height, 0) / 2);
        var sx = Math.floor(Math.max(bitmap.width / 2 - width / 2, 0));
        var sy = Math.floor(Math.max(bitmap.height / 2 - height / 2, 0));
        this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy);
    };

    // エネミーの職業（クラス）を描画する
    Window_Base.prototype.drawEnemyClass = function(enemy, x, y, width) {
        width = width || 168;
        var className = enemy.enemy().meta.srpgClass;
        if (!className) {
            className = _enemyDefaultClass;
        }
        this.resetTextColor();
        this.drawText(className, x, y, width);
    };

    // エネミーの顔グラフィックを描画する
    Window_Base.prototype.drawEnemyFace = function(enemy, x, y, width, height) {
        var faceName = enemy.enemy().meta.faceName;
        var faceIndex = Number(enemy.enemy().meta.faceIndex);
        if (!faceName) {
            this.drawEnemyFaceWhenNoFace(enemy, x, y, width, height);
        } else {
            this.drawFace(faceName, faceIndex, x, y, width, height);
        }
    };

    // エネミーのレベルを描画する
    Window_Base.prototype.drawEnemyLevel = function(enemy, x, y) {
        var srpgLevel = enemy.enemy().meta.srpgLevel;
        if (srpgLevel) {
            this.changeTextColor(this.systemColor());
            this.drawText(TextManager.levelA, x, y, 48);
            this.resetTextColor();
            this.drawText(srpgLevel, x + 84, y, 36, 'right');
        }
    };

    // アクターの装備（武器）を描画する
    Window_Base.prototype.drawActorSrpgEqiup = function(actor, x, y) {
        var item = actor.weapons()[0]
        this.changeTextColor(this.systemColor());
        this.drawText(_textSrpgEquip, x, y, 92);
        this.resetTextColor();
        if (item) {
            this.drawItemName(item, x + 96, y, 240);
        } else {
            this.drawText(_textSrpgNone, x + 96, y, 240);
        }
    };

    // エネミーの装備（武器）を描画する
    Window_Base.prototype.drawEnemySrpgEqiup = function(enemy, x, y) {
        var item = $dataWeapons[Number(enemy.enemy().meta.srpgWeapon)];
        this.changeTextColor(this.systemColor());
        this.drawText(_textSrpgEquip, x, y, 92);
        this.resetTextColor();
        if (item) {
            this.drawItemName(item, x + 96, y, 240);
        } else {
            this.drawText(_textSrpgNone, x + 96, y, 240);
        }
    };

//====================================================================
// ●Window_SrpgStatus
//====================================================================
    window.Window_SrpgStatus = function() {
        this.initialize.apply(this, arguments);
    }

    Window_SrpgStatus.prototype = Object.create(Window_Base.prototype);
    Window_SrpgStatus.prototype.constructor = Window_SrpgStatus;

    Window_SrpgStatus.prototype.initialize = function(x, y) {
        var width = this.windowWidth();
        var height = this.windowHeight();
        this._type = null;
        this._battler = null;
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.refresh();
    };

    Window_SrpgStatus.prototype.windowWidth = function() {
        return 408;
    };

    Window_SrpgStatus.prototype.windowHeight = function() {
        return this.fittingHeight(10);
    };

    Window_SrpgStatus.prototype.setBattler = function(data) {
        this._type = data[0];
        this._battler = data[1];
        this.refresh();
    };

    Window_SrpgStatus.prototype.clearBattler = function() {
        this._type = null;
        this._battler = null;
        this.refresh();
    };

    Window_SrpgStatus.prototype.refresh = function() {
        this.contents.clear();
        if (!this._battler) {
          return;
        }
        if (this._type === 'actor') {
            this.drawContentsActor();
        } else if (this._type === 'enemy') {
            this.drawContentsEnemy();
        }
    };

    Window_SrpgStatus.prototype.drawContentsActor = function() {
        var lineHeight = this.lineHeight();
        this.drawActorName(this._battler, 6, lineHeight * 0);
        this.drawActorClass(this._battler, 192, lineHeight * 0);
        this.drawActorFace(this._battler, 6, lineHeight * 1);
        this.drawBasicInfoActor(176, lineHeight * 1);
        this.drawActorSrpgEqiup(this._battler, 6, lineHeight * 5);
        this.drawParameters(6, lineHeight * 6);
        this.drawSrpgParameters(6, lineHeight * 9);
    };

    Window_SrpgStatus.prototype.drawContentsEnemy = function() {
        var lineHeight = this.lineHeight();
        this.drawActorName(this._battler, 6, lineHeight * 0);
        this.drawEnemyClass(this._battler, 192, lineHeight * 0);
        this.drawEnemyFace(this._battler, 6, lineHeight * 1);
        this.drawBasicInfoEnemy(176, lineHeight * 1);
        this.drawEnemySrpgEqiup(this._battler, 6, lineHeight * 5);
        this.drawParameters(6, lineHeight * 6);
        this.drawSrpgParameters(6, lineHeight * 9);
    };

    Window_SrpgStatus.prototype.drawBasicInfoActor = function(x, y) {
        var lineHeight = this.lineHeight();
        this.drawSrpgExpRate(this._battler, x, y + lineHeight * 0);
        this.drawActorLevel(this._battler, x, y + lineHeight * 0);
        this.drawActorIcons(this._battler, x, y + lineHeight * 1);
        this.drawActorHp(this._battler, x, y + lineHeight * 2);
        if ($dataSystem.optDisplayTp) {
            this.drawActorMp(this._battler, x, y + lineHeight * 3, 90);
            this.drawActorTp(this._battler, x + 96, y + lineHeight * 3, 90);
        } else {
            this.drawActorMp(this._battler, x, y + lineHeight * 3);
        }
    };

    Window_SrpgStatus.prototype.drawBasicInfoEnemy = function(x, y) {
        var lineHeight = this.lineHeight();
        this.drawEnemyLevel(this._battler, x, y + lineHeight * 0);
        this.drawActorIcons(this._battler, x, y + lineHeight * 1);
        this.drawActorHp(this._battler, x, y + lineHeight * 2);
        if ($dataSystem.optDisplayTp) {
            this.drawActorMp(this._battler, x, y + lineHeight * 3, 90);
            this.drawActorTp(this._battler, x + 96, y + lineHeight * 3, 90);
        } else {
            this.drawActorMp(this._battler, x, y + lineHeight * 3);
        }
    };

    Window_SrpgStatus.prototype.drawParameters = function(x, y) {
        var lineHeight = this.lineHeight();
        for (var i = 0; i < 6; i++) {
            var paramId = i + 2;
            var x2 = x + 188 * (i % 2);
            var y2 = y + lineHeight * Math.floor(i / 2);
            this.changeTextColor(this.systemColor());
            this.drawText(TextManager.param(paramId), x2, y2, 120);
            this.resetTextColor();
            this.drawText(this._battler.param(paramId), x2 + 120, y2, 48, 'right');
        }
    };

    Window_SrpgStatus.prototype.drawSrpgParameters = function(x, y) {
        var lineHeight = this.lineHeight();
        this.changeTextColor(this.systemColor());
        this.drawText(_textSrpgMove, x, y, 120);
        this.resetTextColor();
        this.drawText(this._battler.srpgMove(), x + 120, y, 48, 'right');
        this.changeTextColor(this.systemColor());
        this.drawText(_textSrpgRange, x + 188, y, 120);
        this.resetTextColor();
        var text = '';
        if (this._battler.srpgWeaponMinRange() > 0) {
            text += this._battler.srpgWeaponMinRange() + '-';
        }
        text += this._battler.srpgWeaponRange();
        this.drawText(text, x + 188 + 72, y, 96, 'right');
    };

//====================================================================
// ●Window_SrpgActorCommandStatus
//====================================================================
    window.Window_SrpgActorCommandStatus = function() {
        this.initialize.apply(this, arguments);
    }

    Window_SrpgActorCommandStatus.prototype = Object.create(Window_Base.prototype);
    Window_SrpgActorCommandStatus.prototype.constructor = Window_SrpgActorCommandStatus;

    Window_SrpgActorCommandStatus.prototype.initialize = function(x, y) {
        var width = this.windowWidth();
        var height = this.windowHeight();
        this._battler = null;
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.refresh();
    };

    Window_SrpgActorCommandStatus.prototype.windowWidth = function() {
        return Graphics.boxWidth - 240;
    };

    Window_SrpgActorCommandStatus.prototype.windowHeight = function() {
        return this.fittingHeight(3);
    };

    Window_SrpgActorCommandStatus.prototype.setBattler = function(battler) {
        this._battler = battler;
        this.refresh();
        this.open();
    };

    Window_SrpgActorCommandStatus.prototype.clearBattler = function() {
        this._battler = null;
        this.refresh();
        this.close();
    };

    Window_SrpgActorCommandStatus.prototype.refresh = function() {
        this.contents.clear();
        if (!this._battler) {
          return;
        }
        this.drawContents();
    };

    Window_SrpgActorCommandStatus.prototype.drawContents = function() {
        this.drawActorFace(this._battler, 0, -24, Window_Base._faceWidth, Window_Base._faceHeight);
        var x = 156;
        var y = 0;
        var width = this.windowWidth() - x - this.textPadding();
        var width2 = Math.min(200, this.windowWidth() - 180 - this.textPadding());
        var lineHeight = this.lineHeight();
        var x2 = x + 180;
        var width2 = Math.min(200, width - 180 - this.textPadding());
        this.drawActorName(this._battler, x, y);
        this.drawActorLevel(this._battler, x, y + lineHeight * 1);
        this.drawActorIcons(this._battler, x, y + lineHeight * 2);
        this.drawActorClass(this._battler, x2, y);
        this.drawActorHp(this._battler, x2, y + lineHeight * 1, width2);
        if ($dataSystem.optDisplayTp) {
            this.drawActorMp(this._battler, x2, y + lineHeight * 2, width2 / 2 - 4);
            this.drawActorTp(this._battler, x2 + width2 / 2 + 4, y + lineHeight * 2, width2 / 2 - 4);
        } else {
            this.drawActorMp(this._battler, x2, y + lineHeight * 2);
        }
    };

//====================================================================
// ●Window_SrpgBattleStatus
//====================================================================
    window.Window_SrpgBattleStatus = function() {
        this.initialize.apply(this, arguments);
    }

    Window_SrpgBattleStatus.prototype = Object.create(Window_Base.prototype);
    Window_SrpgBattleStatus.prototype.constructor = Window_SrpgBattleStatus;

    Window_SrpgBattleStatus.prototype.initialize = function(pos) {
        var width = this.windowWidth();
        var height = this.windowHeight();
        var x = 0 + width * pos;
        var y = Graphics.boxHeight - height;
        this._type = null;
        this._battler = null;
        this._reserveHp = null;
        this._reserveMp = null;
        this._reserveTp = null;
        this._changeHp = 0;
        this._changeMp = 0;
        this._changeTp = 0;
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.refresh();
    };

    Window_SrpgBattleStatus.prototype.windowWidth = function() {
        return Graphics.boxWidth / 2;
    };

    Window_SrpgBattleStatus.prototype.windowHeight = function() {
        return this.fittingHeight(4);
    };

    Window_SrpgBattleStatus.prototype.update = function() {
        Window_Base.prototype.update.call(this);
        this.updateData();
    };


    Window_SrpgBattleStatus.prototype.updateData = function() {
        if (!this._type || !this._battler) {
            return;
        }
        if (this._changeHp > 0 || this._changeMp > 0 || this._changeTp > 0) {
            this.refresh();
        }
    };

    Window_SrpgBattleStatus.prototype.setBattler = function(battler) {
        if (battler.isActor() == true) {
            this._type = 'actor';
        } else if (battler.isEnemy() == true) {
            this._type = 'enemy';
        }
        this._battler = battler;
        this._reserveHp = battler.hp;
        this._reserveMp = battler.mp;
        this._reserveTp = battler.tp;
        this._changeHp = 1;
        this._changeMp = 1;
        $dataSystem.optDisplayTp == true ? this._changeTp = 1 : this._changeTp = 0;
        this.refresh();
    };

    Window_SrpgBattleStatus.prototype.refresh = function() {
        this.contents.clear();
        if (!this._battler) {
          return;
        }
        if (this._changeHp <= 0 && this._reserveHp != this._battler.hp) {
            this._changeHp = 20;
        }
        if (this._changeMp <= 0 && this._reserveMp != this._battler.mp) {
            this._changeMp = 20;
        }
        if (this._changeTp <= 0 && this._reserveTp != this._battler.tp) {
            this._changeTp = 20;
        }
        if (this._type === 'actor') {
            this.drawContentsActor();
        } else if (this._type === 'enemy') {
            this.drawContentsEnemy();
        }
    };

    Window_SrpgBattleStatus.prototype.drawContentsActor = function() {
        var lineHeight = this.lineHeight();
        this.drawActorName(this._battler, 176, lineHeight * 0);
        this.drawActorFace(this._battler, 6, lineHeight * 0);
        this.drawBasicInfoActor(176, lineHeight * 1);
    };

    Window_SrpgBattleStatus.prototype.drawContentsEnemy = function() {
        var lineHeight = this.lineHeight();
        this.drawActorName(this._battler, 176, lineHeight * 0);
        this.drawEnemyFace(this._battler, 6, lineHeight * 0);
        this.drawBasicInfoEnemy(176, lineHeight * 1);
    };

    Window_SrpgBattleStatus.prototype.drawBasicInfoActor = function(x, y) {
        var lineHeight = this.lineHeight();
        this.drawActorIcons(this._battler, x, y + lineHeight * 0);
        this.drawActorHp(this._battler, x, y + lineHeight * 1);
        if ($dataSystem.optDisplayTp) {
            this.drawActorMp(this._battler, x, y + lineHeight * 2, 90);
            this.drawActorTp(this._battler, x + 96, y + lineHeight * 2, 90);
        } else {
            this.drawActorMp(this._battler, x, y + lineHeight * 2);
        }

    };

    Window_SrpgBattleStatus.prototype.drawBasicInfoEnemy = function(x, y) {
        var lineHeight = this.lineHeight();
        this.drawActorIcons(this._battler, x, y + lineHeight * 0);
        this.drawActorHp(this._battler, x, y + lineHeight * 1);
        if ($dataSystem.optDisplayTp) {
            this.drawActorMp(this._battler, x, y + lineHeight * 2, 90);
            this.drawActorTp(this._battler, x + 96, y + lineHeight * 2, 90);
        } else {
            this.drawActorMp(this._battler, x, y + lineHeight * 2);
        }
    };

    Window_SrpgBattleStatus.prototype.drawActorHp = function(actor, x, y, width) {
        width = width || 186;
        var color1 = this.hpGaugeColor1();
        var color2 = this.hpGaugeColor2();
        var nowHp = Math.floor(actor.hp + (this._reserveHp - actor.hp) / 20 * (this._changeHp - 1));
        var rate = nowHp / actor.mhp;
        this.drawGauge(x, y, width, rate, color1, color2);
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.hpA, x, y, 44);
        this.drawCurrentAndMax(nowHp, actor.mhp, x, y, width,
                               this.hpColor(actor), this.normalColor());
        this._changeHp -= 1;
        if (this._changeHp <= 0) {
            this._reserveHp = actor.hp;
        }
    };

    Window_SrpgBattleStatus.prototype.drawActorMp = function(actor, x, y, width) {
        width = width || 186;
        var color1 = this.mpGaugeColor1();
        var color2 = this.mpGaugeColor2();
        var nowMp = Math.floor(actor.mp + (this._reserveMp - actor.mp) / 20 * (this._changeMp - 1));
        if (actor.mmp == 0) {
            var rate = 0;
        } else {
            var rate = nowMp / actor.mmp;
        }
        this.drawGauge(x, y, width, rate, color1, color2);
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.mpA, x, y, 44);
        this.drawCurrentAndMax(nowMp, actor.mmp, x, y, width,
                               this.mpColor(actor), this.normalColor());
        this._changeMp -= 1;
        if (this._changeMp <= 0) {
            this._reserveMp = actor.mp;
        }
    };

    Window_SrpgBattleStatus.prototype.drawActorTp = function(actor, x, y, width) {
        width = width || 96;
        var color1 = this.tpGaugeColor1();
        var color2 = this.tpGaugeColor2();
        var nowTp = Math.floor(actor.tp + (this._reserveTp - actor.tp) / 20 * (this._changeTp - 1));
        var rate = nowTp / actor.maxTp();
        this.drawGauge(x, y, width, rate, color1, color2);
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.tpA, x, y, 44);
        this.changeTextColor(this.tpColor(actor));
        this.drawText(nowTp, x + width - 64, y, 64, 'right');
        this._changeTp -= 1;
        if (this._changeTp <= 0) {
            this._reserveTp = actor.tp;
        }
    };

//====================================================================
// ●Window_SrpgBattleResult
//====================================================================
    window.Window_SrpgBattleResult = function() {
        this.initialize.apply(this, arguments);
    }

    Window_SrpgBattleResult.prototype = Object.create(Window_Base.prototype);
    Window_SrpgBattleResult.prototype.constructor = Window_SrpgBattleResult;

    Window_SrpgBattleResult.prototype.initialize = function(battler) {
        var width = this.windowWidth();
        var height = this.windowHeight();
        var x = (Graphics.boxWidth - width) / 2;
        var y = Graphics.boxHeight / 2 - height;
        this._battler = battler;
        this._reserveExp = this._battler.currentExp();
        this._level = this._battler.level;
        this._rewards = null;
        this._changeExp = 0;
        Window_Base.prototype.initialize.call(this, x, y, width, height);
    };

    Window_SrpgBattleResult.prototype.windowWidth = function() {
        return Graphics.boxWidth - 300;
    };

    Window_SrpgBattleResult.prototype.windowHeight = function() {
        return this.fittingHeight(4);
    };

    Window_SrpgBattleResult.prototype.isChangeExp = function() {
        return this._changeExp > 0;
    };

    Window_SrpgBattleResult.prototype.update = function() {
        Window_Base.prototype.update.call(this);
        this.updateData();
    };


    Window_SrpgBattleResult.prototype.updateData = function() {
        if (!this._battler) {
            return;
        }
        if (this._changeExp > 0) {
            this.refresh();
        }
    };

    Window_SrpgBattleResult.prototype.setRewards = function(rewards) {
        this._rewards = rewards;
        this._changeExp = 30;
    };

    Window_SrpgBattleResult.prototype.refresh = function() {
        this.contents.clear();
        this.drawContents();
    };

    Window_SrpgBattleResult.prototype.drawContents = function() {
        var lineHeight = this.lineHeight();
        this.drawGainExp(6, lineHeight * 0);
        this.drawGainGold(6, lineHeight * 2);
        this.drawGainItem(0, lineHeight * 3);
    };

    Window_SrpgBattleResult.prototype.drawGainExp = function(x, y) {
        var lineHeight = this.lineHeight();
        var exp = Math.round(this._rewards.exp * $gameParty.battleMembers()[0].finalExpRate());
        var width = this.windowWidth() - this.padding * 2;
        if (exp > 0) {
            var text = TextManager.obtainExp.format(exp, TextManager.exp);
            this.resetTextColor();
            this.drawText(text, x, y, width);
        } else {
            this._changeExp = 1;
        }
        var color1 = this.hpGaugeColor1();
        var color2 = this.hpGaugeColor2();
        var nowExp = Math.floor(this._reserveExp + exp / 30 * (31 - this._changeExp));
        if (nowExp >= this._battler.expForLevel(this._level + 1)) {
            this._level += 1;
            var se = {};
            se.name = _expSe;
            se.pan = 0;
            se.pitch = 100;
            se.volume = 90;
            AudioManager.playSe(se);
        }
        if (this._level >= this._battler.maxLevel()) {
            var rate = 1.0;
            var nextExp = '-------'
        } else {
            var rate = (nowExp - this._battler.expForLevel(this._level)) / 
                       (this._battler.expForLevel(this._level + 1) - this._battler.expForLevel(this._level));
            var nextExp = this._battler.expForLevel(this._level + 1) - nowExp;
        }
        this.drawGauge(x + 100, y + lineHeight, width - 100, rate, color1, color2);
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.levelA, x, y + lineHeight, 48);
        this.resetTextColor();
        this.drawText(this._level, x + 48, y + lineHeight, 36, 'right');
        var expNext = TextManager.expNext.format(TextManager.level);
        this.drawText(expNext, width - 270, y + lineHeight, 270);
        this.drawText(nextExp, width - 270, y + lineHeight, 270, 'right');
        this._changeExp -= 1;
    };

    Window_SrpgBattleResult.prototype.drawGainGold = function(x, y) {
        var gold = this._rewards.gold;
        var width = (this.windowWidth() - this.padding * 2) / 2;
        if (gold > 0) {
            var unitWidth = Math.min(80, this.textWidth(TextManager.currencyUnit));
            this.resetTextColor();
            this.drawText(gold, x, y, width - unitWidth - 6);
            this.changeTextColor(this.systemColor());
            this.drawText(TextManager.currencyUnit, x + this.textWidth(gold) + 6, y, unitWidth);
        }
    }

    Window_SrpgBattleResult.prototype.drawGainItem = function(x, y) {
        var items = this._rewards.items;
        if (items.length > 1) {
            var width = (this.windowWidth() - this.padding * 2) / 2;
        } else {
            var width = this.windowWidth() - this.padding * 2;
        }
        if (items.length > 0) {
            for (var i = 0; i < items.length; i++) {
                this.drawItemName(items[i], x + width * Math.floor(0.5 + i * 0.5), y - this.lineHeight() * (i % 2), width);
            }
        }
    }

//====================================================================
// ●Window_SrpgPrediction
//====================================================================
    window.Window_SrpgPrediction = function() {
        this.initialize.apply(this, arguments);
    }

    Window_SrpgPrediction.prototype = Object.create(Window_Base.prototype);
    Window_SrpgPrediction.prototype.constructor = Window_SrpgPrediction;

    Window_SrpgPrediction.prototype.initialize = function(x, y) {
        var width = this.windowWidth();
        var height = this.windowHeight();
        this._actionArray = [];
        this._targetArray = [];
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.refresh();
    };

    Window_SrpgPrediction.prototype.windowWidth = function() {
        return Graphics.boxWidth;
    };

    Window_SrpgPrediction.prototype.windowHeight = function() {
        if (_srpgPredictionWindowMode === 2) {
            return this.fittingHeight(1);
        } else {
            return this.fittingHeight(3);
        }
    };

    Window_SrpgPrediction.prototype.setBattler = function(data1, data2) {
        this._actionArray = data1;
        this._targetArray = data2;
        this.refresh();
    };

    Window_SrpgPrediction.prototype.clearBattler = function() {
        this._actionArray = [];
        this._targetArray = [];
        this.refresh();
    };

    Window_SrpgPrediction.prototype.refresh = function() {
        this.contents.clear();
        if (!this._actionArray[1] || !this._targetArray[1]) {
          return;
        }
        this.setTargetAction();
        this.drawContents();
    };

    Window_SrpgPrediction.prototype.setTargetAction = function() {
        $gameParty.clearSrpgBattleActors();
        $gameTroop.clearSrpgBattleEnemys();
        $gameTroop.clear();
        if (this._actionArray[0] === 'actor') {
            $gameParty.pushSrpgBattleActors(this._actionArray[1]);
            if (this._targetArray[0] === 'actor') {
                if (this._actionArray[1] != this._targetArray[1]) {
                    $gameParty.pushSrpgBattleActors(this._targetArray[1]);
                    this._actionArray[1].action(0).setTarget(1);
                } else {
                    this._actionArray[1].action(0).setTarget(0);
                }
            } else if (this._targetArray[0] === 'enemy') {
                $gameTroop.pushSrpgBattleEnemys(this._targetArray[1]);
                this._actionArray[1].action(0).setTarget(0);
            }
        } else if (this._actionArray[0] === 'enemy') {
            $gameTroop.pushSrpgBattleEnemys(this._actionArray[1]);
            this._actionArray[1].action(0).setSrpgEnemySubject(0);
            if (this._targetArray[0] === 'actor') {
                $gameParty.pushSrpgBattleActors(this._targetArray[1]);
                this._actionArray[1].action(0).setTarget(0);
            } else if (this._targetArray[0] === 'enemy') {
                if (this._actionArray[1] != this._targetArray[1]) {
                    $gameTroop.pushSrpgBattleEnemys(this._targetArray[1]);
                    this._actionArray[1].action(0).setTarget(1);
                } else {
                    this._actionArray[1].action(0).setTarget(0);
                }
            }
        }
        //対象の行動を設定
        if (this._actionArray[1] != this._targetArray[1]) {
            this._targetArray[1].srpgMakeNewActions();
            if (this._actionArray[0] === 'actor' && this._targetArray[0] === 'enemy' &&
                this._targetArray[1].canMove()) {
                $gameTroop.pushMembers(this._targetArray[1]);
                this._targetArray[1].action(0).setSrpgEnemySubject(0);
                this._targetArray[1].action(0).setAttack();
                this._targetArray[1].action(0).setTarget(0);
            }
            if (this._actionArray[0] === 'enemy' && this._targetArray[0] === 'actor' &&
                this._targetArray[1].canMove()) {
                this._targetArray[1].action(0).setAttack();
                this._targetArray[1].action(0).setTarget(0);
            }
        }
    };

    Window_SrpgPrediction.prototype.drawContents = function() {
        var windowWidth = this.windowWidth();
        var lineHeight = this.lineHeight();
        var x = 40;
        // 攻撃側
        var actor = this._actionArray[1];
        var target = this._targetArray[1];
        var action = actor.currentAction();
        var damage = action.srpgPredictionDamage(target);
        var hit = action.itemHit(target);
        var eva = action.itemEva(target);
        this.drawSrpgBattleActionName(actor, action, windowWidth / 2 + x, lineHeight * 0, true);
        this.drawSrpgBattleHit(hit, eva, windowWidth / 2 + x, lineHeight * 1);
        this.drawSrpgBattleDistance(actor, action, windowWidth / 2 + 160 + x, lineHeight * 1);
        this.drawSrpgBattleDamage(damage, windowWidth / 2 + x, lineHeight * 2);
        // 迎撃側
        var actor = this._targetArray[1];
        var target = this._actionArray[1];
        var action = actor.currentAction();
        if (!this._targetArray[1].canUse(action.item())) {
            action = null;
        }
        if (!action || actor == target) {
            this.drawSrpgBattleActionName(actor, action, x, lineHeight * 0, false);
            return;
        }
        var damage = action.srpgPredictionDamage(target);
        var hit = action.itemHit(target);
        var eva = action.itemEva(target);
        this.drawSrpgBattleActionName(actor, action, x, lineHeight * 0, true);
        this.drawSrpgBattleHit(hit, eva, x, lineHeight * 1);
        this.drawSrpgBattleDistance(actor, action, 160 + x, lineHeight * 1);
        this.drawSrpgBattleDamage(damage, x, lineHeight * 2);
        this._targetArray[1].clearActions();
    };

    Window_SrpgPrediction.prototype.drawSrpgBattleActionName = function(actor, action, x, y, flag) {
        if (action && flag == true) {
            var skill = action.item();
            if (skill) {
                var costWidth = this.costWidth();
                this.changePaintOpacity(this.isEnabled(actor, skill));
                if (DataManager.isSkill(skill) && skill.id == actor.attackSkillId() &&
                    !actor.hasNoWeapons()) {
                    if (actor.isActor()) {
                        var item = actor.weapons()[0];
                    } else {
                        var item = $dataWeapons[Number(actor.enemy().meta.srpgWeapon)];
                    }
                    this.drawItemName(item, x, y, 280 - costWidth);
                } else {
                    this.drawItemName(skill, x, y, 280 - costWidth);
                }
                this.drawSkillCost(actor, skill, x, y, 288);
                this.changePaintOpacity(1);
            } else {
                this.drawText('------------', x + 52, y, 96, 'right');
            }
        } else {
            this.drawText('------------', x + 52, y, 96, 'right');
        }
    };

    Window_SrpgPrediction.prototype.drawSrpgBattleDistance = function(actor, action, x, y) {
        var skill = action.item();
        this.changeTextColor(this.systemColor());
        this.drawText(_textSrpgRange, x, y, 98);
        this.resetTextColor();
        var text = '';
        if (actor.srpgSkillMinRange(skill) > 0) {
            text += actor.srpgSkillMinRange(skill) + '-';
        }
        text += actor.srpgSkillRange(skill);
        this.drawText(text, x + 32, y, 96, 'right');
    };

    Window_SrpgPrediction.prototype.drawSrpgBattleDamage = function(damage, x, y) {
        this.changeTextColor(this.systemColor());
        if (damage >= 0) {
            this.drawText(_textSrpgDamage, x, y, 164);
            this.resetTextColor();
            this.drawText(damage, x + 188, y, 100, 'right');
        } else {
            this.drawText(_textSrpgHealing, x, y, 164);
            this.resetTextColor();
            this.drawText(damage * -1, x + 188, y, 100, 'right');
        }
    };

    Window_SrpgPrediction.prototype.drawSrpgBattleHit = function(hit, eva, x, y) {
        var val = 1.0 * hit * (1.0 - eva);
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.param(8), x, y, 98);
        this.resetTextColor();
        this.drawText(Math.floor(val * 100) + '%', x + 64, y, 64, 'right');
    };

    Window_SrpgPrediction.prototype.costWidth = function() {
        return this.textWidth('000');
    };

    Window_SrpgPrediction.prototype.drawSkillCost = function(actor, skill, x, y, width) {
        if (actor.skillTpCost(skill) > 0) {
            this.changeTextColor(this.tpCostColor());
            this.drawText(actor.skillTpCost(skill), x, y, width, 'right');
        } else if (actor.skillMpCost(skill) > 0) {
            this.changeTextColor(this.mpCostColor());
            this.drawText(actor.skillMpCost(skill), x, y, width, 'right');
        }
    };

    Window_SrpgPrediction.prototype.isEnabled = function(actor, item) {
        return actor && actor.canUse(item);
    };

//====================================================================
// ●Window_ActorCommand
//====================================================================
    Window_Command.prototype.isList = function() {
        if (this._list) {
            return true;
        } else {
            return false;
        }
    };

    var _SRPG_Window_ActorCommand_numVisibleRows = Window_ActorCommand.prototype.numVisibleRows;
    Window_ActorCommand.prototype.numVisibleRows = function() {
        if ($gameSystem.isSRPGMode() == true) {
            if (this.isList()) {
                return this.maxItems();
            } else {
                return 0;
            }
        } else {
            return _SRPG_Window_ActorCommand_numVisibleRows.call(this);
        }
    };

    var _SRPG_Window_ActorCommand_makeCommandList = Window_ActorCommand.prototype.makeCommandList;
    Window_ActorCommand.prototype.makeCommandList = function() {
        if ($gameSystem.isSRPGMode() == true) {
            if (this._actor) {
                this.addAttackCommand();
                this.addSkillCommands();
                this.addItemCommand();
                if (_srpgActorCommandEquip == 'true') {
                    this.addEquipCommand();
                }
                this.addWaitCommand();
            }
        } else {
            _SRPG_Window_ActorCommand_makeCommandList.call(this);
        }
    };

    Window_ActorCommand.prototype.addEquipCommand = function() {
        this.addCommand(_textSrpgEquip, 'equip', this._actor.canSrpgEquip());
    };

    Window_ActorCommand.prototype.addWaitCommand = function() {
        this.addCommand(_textSrpgWait, 'wait');
    };

    var _SRPG_Window_ActorCommand_setup = Window_ActorCommand.prototype.setup;
    Window_ActorCommand.prototype.setup = function(actor) {
        if ($gameSystem.isSRPGMode() == true) {
            this._actor = actor;
            this.clearCommandList();
            this.makeCommandList();
            this.updatePlacement();
            this.refresh();
            this.selectLast();
            this.activate();
            this.open();
        } else {
            _SRPG_Window_ActorCommand_setup.call(this, actor);
        }
    };

    Window_ActorCommand.prototype.updatePlacement = function() {
        this.width = this.windowWidth();
        this.height = this.windowHeight();
        this.x = Math.max($gameTemp.activeEvent().screenX() - $gameMap.tileWidth() / 2 - this.windowWidth(), 0);
        if ($gameTemp.activeEvent().screenY() < Graphics.boxHeight - 160) {
            var eventY = $gameTemp.activeEvent().screenY();
        } else {
            var eventY = Graphics.boxHeight - 160;
        }
        this.y = Math.max(eventY - this.windowHeight(), 0);
    };

//====================================================================
// ●Window_SrpgBattle
//====================================================================
    window.Window_SrpgBattle = function() {
        this.initialize.apply(this, arguments);
    }

    Window_SrpgBattle.prototype = Object.create(Window_HorzCommand.prototype);
    Window_SrpgBattle.prototype.constructor = Window_SrpgBattle;

    Window_SrpgBattle.prototype.initialize = function() {
        Window_HorzCommand.prototype.initialize.call(this, 0, 0);
        this._actor = null;
        this._item = null;
        this.openness = 0;
        this.deactivate();
    };

    Window_SrpgBattle.prototype.windowWidth = function() {
        return 480;
    };

    Window_SrpgBattle.prototype.maxCols = function() {
        return 2;
    };

    Window_SrpgBattle.prototype.makeCommandList = function() {
        this.addCommand(TextManager.fight, 'battleStart', this.isEnabled(this._item));
        this.addCommand(TextManager.cancel, 'cancel');
    };

    Window_SrpgBattle.prototype.setup = function(actorArray) {
        this._actor = actorArray[1];
        this._item = actorArray[1].currentAction().item();
        this.clearCommandList();
        this.makeCommandList();
        this.refresh();
        this.activate();
        this.open();
    };

    Window_SrpgBattle.prototype.isEnabled = function(item) {
        if ($gameTemp.targetEvent()) {
            var moveRangeList = $gameTemp.moveList();
            var pos = [$gameTemp.targetEvent().posX(), $gameTemp.targetEvent().posY()];
            var flag = false;
            for (var i = 0; i < moveRangeList.length; i++) {
                 if (moveRangeList[i][0] == pos[0] && moveRangeList[i][1] == pos[1]) {
                     flag = true;
                     break;
                 }
            }
            return this._actor && this._actor.canUse(item) && flag;
        } else {
            return this._actor && this._actor.canUse(item);
        }
    };

    Window_SrpgBattle.prototype.clearActor = function() {
        this._actor = null;
        this._item = null;
        this.clearCommandList();
    };

//====================================================================
// ●Window_BattleLog
//====================================================================
    var _SRPG_Window_BattleLog_showEnemyAttackAnimation = Window_BattleLog.prototype.showEnemyAttackAnimation;
    Window_BattleLog.prototype.showEnemyAttackAnimation = function(subject, targets) {
        if ($gameSystem.isSRPGMode() == true) {
            this.showNormalAnimation(targets, subject.attackAnimationId(), false);
        } else {
            _SRPG_Window_BattleLog_showEnemyAttackAnimation.call(this, subject, targets);
        }
    };

//====================================================================
// ●Window_MenuStatus
//====================================================================
    var _SRPG_Window_MenuStatus_drawItemImage = Window_MenuStatus.prototype.drawItemImage;
    Window_MenuStatus.prototype.drawItemImage = function(index) {
        if ($gameSystem.isSRPGMode() == true) {
            var actor = $gameParty.members()[index];
            var rect = this.itemRect(index);
            if (actor.srpgTurnEnd() == true || actor.isRestricted() == true) {
                this.changePaintOpacity(false);
            } else {
                this.changePaintOpacity(true);
            }
            this.drawActorFace(actor, rect.x + 1, rect.y + 1, Window_Base._faceWidth, Window_Base._faceHeight);
        } else {
            _SRPG_Window_MenuStatus_drawItemImage.call(this, index);
        }
    };

//====================================================================
// ●Window_MenuCommand
//====================================================================
    var _SRPG_Window_MenuCommand_makeCommandList = Window_MenuCommand.prototype.makeCommandList;
    Window_MenuCommand.prototype.makeCommandList = function() {
        if ($gameSystem.isSRPGMode() == true) {
            this.addTurnEndCommand();
            if (_srpgAutoBattleStateId > 0) this.addAutoBattleCommand();
            if (_srpgWinLoseConditionCommand == 'true') this.addWinLoseConditionCommand();
        }
        _SRPG_Window_MenuCommand_makeCommandList.call(this);
    };

    Window_MenuCommand.prototype.addTurnEndCommand = function() {
        this.addCommand(_textSrpgTurnEnd, 'turnEnd', true);
    };

    Window_MenuCommand.prototype.addAutoBattleCommand = function() {
        this.addCommand(_textSrpgAutoBattle, 'autoBattle', true);
    };

    Window_MenuCommand.prototype.addWinLoseConditionCommand = function() {
        this.addCommand(_textSrpgWinLoseCondition, 'winLoseCondition', true);
    };

    var _SRPG_Window_MenuCommand_isFormationEnabled = Window_MenuCommand.prototype.isFormationEnabled;
    Window_MenuCommand.prototype.isFormationEnabled = function() {
        if ($gameSystem.isSRPGMode() == true) {
            return false;
        } else {
            return _SRPG_Window_MenuCommand_isFormationEnabled.call(this);
        }
    };

//====================================================================
// ●Window_WinLoseCondition
//====================================================================
window.Window_WinLoseCondition = function() {
    this.initialize.apply(this, arguments);
}

Window_WinLoseCondition.prototype = Object.create(Window_Base.prototype);
Window_WinLoseCondition.prototype.constructor = Window_WinLoseCondition;

Window_WinLoseCondition.prototype.initialize = function() {
    Window_Base.prototype.initialize.call(this, 0, 0, Graphics.boxWidth, Graphics.boxHeight);
    this.refresh();
    this.openness = 0;
};

Window_WinLoseCondition.prototype.refresh = function() {
    this.contents.clear();
    var array = $gameSystem.srpgWinLoseCondition();
    if (array && array.length > 0) {
        var line = 0;
        this.height = (array.length + 2) * this.lineHeight() + this.standardPadding() * 2;
        this.y = Graphics.boxHeight / 2 - this.height / 2;
        this.changeTextColor(this.systemColor());
        this.drawText(_textSrpgWinCondition, 0, line * this.lineHeight(), this.width - 32, 'center');
        line += 1;
        this.changeTextColor(this.normalColor());
        for (var i = 0; i < array.length; i++) {
            if (array[i][0] == 'win') {
                this.drawText(array[i][1], 0, line * this.lineHeight(), this.width - 32);
                line += 1;
            }
        }
        this.changeTextColor(this.systemColor());
        this.drawText(_textSrpgLoseCondition, 0, line * this.lineHeight(), this.width - 32, 'center');
        line += 1;
        this.changeTextColor(this.normalColor());
        for (var i = 0; i < array.length; i++) {
            if (array[i][0] == 'lose') {
                this.drawText(array[i][1], 0, line * this.lineHeight(), this.width - 32);
                line += 1;
            }
        }
    }
};

//====================================================================
// ●Scene_Base
//====================================================================
    //SRPG戦闘中は無効化する
    var _SRPG_Scene_Base_checkGameover = Scene_Base.prototype.checkGameover;
    Scene_Base.prototype.checkGameover = function() {
        if ($gameSystem.isSRPGMode() == false) {
            _SRPG_Scene_Base_checkGameover.call(this);
        }
    };

//====================================================================
// ●Scene_Map
//====================================================================
    // 初期化
    var _SRPG_SceneMap_initialize = Scene_Map.prototype.initialize;
    Scene_Map.prototype.initialize = function() {
        _SRPG_SceneMap_initialize.call(this);
        this._callSrpgBattle = false;
    };

    // フェード速度を返す
    Scene_Map.prototype.fadeSpeed = function() {
        if ($gameSystem.isSRPGMode() == true && _srpgBattleQuickLaunch == 'true') {
           return 12;
        } else {
           return Scene_Base.prototype.fadeSpeed.call(this);
        }
    };

    //セーブファイルをロードした際に画像をプリロードする
    var _SRPG_Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        _SRPG_Scene_Map_start.call(this);
        if ($gameTemp.isSrpgLoadFlag() == true) {
            $gameMap.events().forEach(function(event) {
                var battlerArray = $gameSystem.EventToUnit(event.eventId());
                if (battlerArray && battlerArray[0] === 'actor') {
                    var bitmap = ImageManager.loadFace(battlerArray[1].faceName());
                } else if (battlerArray && battlerArray[0] === 'enemy') {
                    var faceName = battlerArray[1].enemy().meta.faceName;
                    if (faceName) {
                        var bitmap = ImageManager.loadFace(faceName);
                    } else {
                        if ($gameSystem.isSideView()) {
                            var bitmap = ImageManager.loadSvEnemy(battlerArray[1].battlerName(), battlerArray[1].battlerHue());
                        } else {
                            var bitmap = ImageManager.loadEnemy(battlerArray[1].battlerName(), battlerArray[1].battlerHue());
                        }
                    }
                }
            });
            $gameTemp.setSrpgLoadFlag(false);
        }
    };

    // マップのウィンドウ作成
    var _SRPG_SceneMap_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
        _SRPG_SceneMap_createAllWindows.call(this);
        this.createSrpgStatusWindow();
        this.createSrpgActorCommandStatusWindow();
        this.createSrpgTargetWindow();
        this.createSrpgPredictionWindow();
        this.createSrpgActorCommandWindow();
        this.createSrpgBattleWindow();
        this.createHelpWindow();
        this.createSkillWindow();
        this.createItemWindow();
    };

    // ステータスウィンドウを作る
    Scene_Map.prototype.createSrpgStatusWindow = function() {
        this._mapSrpgStatusWindow = new Window_SrpgStatus(0, 0);
        this._mapSrpgStatusWindow.x = Graphics.boxWidth - this._mapSrpgStatusWindow.windowWidth();
        this._mapSrpgStatusWindow.openness = 0;
        this.addWindow(this._mapSrpgStatusWindow);
    };

    // アクターコマンド表示時のステータスウィンドウを作る
    Scene_Map.prototype.createSrpgActorCommandStatusWindow = function() {
        this._mapSrpgActorCommandStatusWindow = new Window_SrpgActorCommandStatus(0, 0);
        this._mapSrpgActorCommandStatusWindow.x = 120;
        this._mapSrpgActorCommandStatusWindow.y = Graphics.boxHeight - this._mapSrpgActorCommandStatusWindow.windowHeight();
        this._mapSrpgActorCommandStatusWindow.openness = 0;
        this.addWindow(this._mapSrpgActorCommandStatusWindow);
    };

    // ターゲットウィンドウを作る
    Scene_Map.prototype.createSrpgTargetWindow = function() {
        this._mapSrpgTargetWindow = new Window_SrpgStatus(0, 0);
        this._mapSrpgTargetWindow.openness = 0;
        this.addWindow(this._mapSrpgTargetWindow);
    };

    // 予想ウィンドウを作る
    Scene_Map.prototype.createSrpgPredictionWindow = function() {
        this._mapSrpgPredictionWindow = new Window_SrpgPrediction(0, 0);
        this._mapSrpgPredictionWindow.y = this._mapSrpgStatusWindow.windowHeight();
        this._mapSrpgPredictionWindow.openness = 0;
        this.addWindow(this._mapSrpgPredictionWindow);
    };

    // アクターコマンドウィンドウを作る
    Scene_Map.prototype.createSrpgActorCommandWindow = function() {
        this._mapSrpgActorCommandWindow = new Window_ActorCommand();
        this._mapSrpgActorCommandWindow.x = Math.max(Graphics.boxWidth / 2 - this._mapSrpgActorCommandWindow.windowWidth(), 0);
        this._mapSrpgActorCommandWindow.y = Math.max(Graphics.boxHeight / 2 - this._mapSrpgActorCommandWindow.windowHeight(), 0);
        this._mapSrpgActorCommandWindow.setHandler('attack', this.commandAttack.bind(this));
        this._mapSrpgActorCommandWindow.setHandler('skill',  this.commandSkill.bind(this));
        this._mapSrpgActorCommandWindow.setHandler('item',   this.commandItem.bind(this));
        this._mapSrpgActorCommandWindow.setHandler('equip',   this.commandEquip.bind(this));
        this._mapSrpgActorCommandWindow.setHandler('wait',  this.commandWait.bind(this));
        this._mapSrpgActorCommandWindow.setHandler('cancel', this.selectPreviousActorCommand.bind(this));
        this.addWindow(this._mapSrpgActorCommandWindow);
    };

    // ヘルプウィンドウを作る
    Scene_Map.prototype.createHelpWindow = function() {
        this._helpWindow = new Window_Help();
        this._helpWindow.visible = false;
        this.addWindow(this._helpWindow);
    };

    // スキルウィンドウを作る
    Scene_Map.prototype.createSkillWindow = function() {
        var wy = this._helpWindow.y + this._helpWindow.height;
        var wh = Graphics.boxHeight - wy - this._mapSrpgActorCommandStatusWindow.windowHeight();
        this._skillWindow = new Window_BattleSkill(0, wy, Graphics.boxWidth, wh);
        this._skillWindow.setHelpWindow(this._helpWindow);
        this._skillWindow.setHandler('ok',     this.onSkillOk.bind(this));
        this._skillWindow.setHandler('cancel', this.onSkillCancel.bind(this));
        this.addWindow(this._skillWindow);
    };

    // アイテムウィンドウを作る
    Scene_Map.prototype.createItemWindow = function() {
        var wy = this._helpWindow.y + this._helpWindow.height;
        var wh = Graphics.boxHeight - wy - this._mapSrpgActorCommandStatusWindow.windowHeight();
        this._itemWindow = new Window_BattleItem(0, wy, Graphics.boxWidth, wh);
        this._itemWindow.setHelpWindow(this._helpWindow);
        this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
        this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
        this.addWindow(this._itemWindow);
    };

    // 戦闘開始ウィンドウを作る
    Scene_Map.prototype.createSrpgBattleWindow = function() {
        this._mapSrpgBattleWindow = new Window_SrpgBattle();
        this._mapSrpgBattleWindow.x = Math.max((Graphics.boxWidth - this._mapSrpgBattleWindow.windowWidth()) / 2, 120);
        this._mapSrpgBattleWindow.y = this._mapSrpgStatusWindow.windowHeight() + this._mapSrpgPredictionWindow.windowHeight();
        this._mapSrpgBattleWindow.setHandler('battleStart', this.commandBattleStart.bind(this));
        this._mapSrpgBattleWindow.setHandler('cancel', this.selectPreviousSrpgBattleStart.bind(this));
        this.addWindow(this._mapSrpgBattleWindow);
    };

    // サブフェーズの状況に応じてキャンセルキーの機能を変更する
    var _SRPG_SceneMap_updateCallMenu = Scene_Map.prototype.updateCallMenu;
    Scene_Map.prototype.updateCallMenu = function() {
        if ($gameSystem.isSRPGMode() == true) {
            if ($gameSystem.srpgWaitMoving() == true ||
                $gameTemp.isAutoMoveDestinationValid() == true ||
                $gameSystem.isSubBattlePhase() === 'status_window' ||
                $gameSystem.isSubBattlePhase() === 'actor_command_window' ||
                $gameSystem.isSubBattlePhase() === 'battle_window' ||
                $gameSystem.isBattlePhase() != 'actor_phase') {
                this.menuCalling = false;
                return;
            }
            if ($gameSystem.isSubBattlePhase() === 'normal') {
                if (Input.isTriggered('pageup')) {
                    SoundManager.playCursor();
                    $gameSystem.getNextLActor();
                } else if (Input.isTriggered('pagedown')) {
                    SoundManager.playCursor();
                    $gameSystem.getNextRActor();
                }
            }
            if ($gameSystem.isSubBattlePhase() === 'actor_move') {
                if (Input.isTriggered('cancel') || TouchInput.isCancelled()) {
                    SoundManager.playCancel();
                    $gameSystem.setSubBattlePhase('normal');
                    $gameSystem.clearSrpgActorCommandStatusWindowNeedRefresh();
                    $gameParty.clearSrpgBattleActors();
                    $gameTemp.clearActiveEvent();
                    $gameTemp.clearMoveTable();
                }
            } else if ($gameSystem.isSubBattlePhase() === 'actor_target') {
                if (Input.isTriggered('cancel') || TouchInput.isCancelled()) {
                    SoundManager.playCancel();
                    var event = $gameTemp.activeEvent();
                    var battlerArray = $gameSystem.EventToUnit(event.eventId());
                    $gameTemp.clearMoveTable();
                    $gameTemp.initialMoveTable($gameTemp.originalPos()[0], $gameTemp.originalPos()[1], battlerArray[1].srpgMove());
                    event.makeMoveTable($gameTemp.originalPos()[0], $gameTemp.originalPos()[1], battlerArray[1].srpgMove(), [0], battlerArray[1].srpgThroughTag());
                    var list = $gameTemp.moveList();
                    for (var i = 0; i < list.length; i++) {
                        var pos = list[i];
                        var flag = $gameSystem.areTheyNoUnits(pos[0], pos[1], '');
                        if (flag == true && _srpgBestSearchRouteSize > 0) event.makeRangeTable(pos[0], pos[1], battlerArray[1].srpgWeaponRange(), [0], pos[0], pos[1], $dataSkills[battlerArray[1].attackSkillId()]);
                    }
                    $gameTemp.pushRangeListToMoveList();
                    $gameTemp.setResetMoveList(true);
                    $gameSystem.setSrpgActorCommandWindowNeedRefresh(battlerArray);
                    $gameSystem.setSubBattlePhase('actor_command_window');
                }
            } else {
                _SRPG_SceneMap_updateCallMenu.call(this);
            }
        } else {
            _SRPG_SceneMap_updateCallMenu.call(this);
        }
    };

    // マップの更新
    var _SRPG_SceneMap_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _SRPG_SceneMap_update.call(this);
        if ($gameSystem.isSRPGMode() == false) {
            return;
        }
        if ($gameSystem.srpgWaitMoving() == true || $gameTemp.isAutoMoveDestinationValid() == true) {
            return;
        }
        //ターン終了コマンドの実行
        if ($gameTemp.isTurnEndFlag() == true) {
            this.menuActorTurnEnd();
            return;
        }
        //アクターコマンドからの装備変更の後処理
        if ($gameTemp.isSrpgActorEquipFlag() == true) {
            this.srpgAfterActorEquip();
            return;
        }
        //ステータスウィンドウの開閉
        var flag = $gameSystem.srpgStatusWindowNeedRefresh();
        if (flag[0]) {
            if (!this._mapSrpgStatusWindow.isOpen() && !this._mapSrpgStatusWindow.isOpening()) {
                this._mapSrpgStatusWindow.setBattler(flag[1]);
                this._mapSrpgStatusWindow.open();
            }
        } else {
            if (this._mapSrpgStatusWindow.isOpen() && !this._mapSrpgStatusWindow.isClosing()) {
                this._mapSrpgStatusWindow.clearBattler();
                this._mapSrpgStatusWindow.close();
            }
        }
        //アクターコマンドウィンドウの開閉
        var flag = $gameSystem.srpgActorCommandWindowNeedRefresh();
        if (flag[0]) {
            if (!this._mapSrpgActorCommandWindow.isOpen() && !this._mapSrpgActorCommandWindow.isOpening()) {
                this._mapSrpgActorCommandWindow.setup(flag[1][1]);
            }
        } else {
            if (this._mapSrpgActorCommandWindow.isOpen() && !this._mapSrpgActorCommandWindow.isClosing()) {
                this._mapSrpgActorCommandWindow.close();
                this._mapSrpgActorCommandWindow.deactivate();
            }
        }
        //行動アクターの簡易ステータスウィンドウの開閉
        var flag = $gameSystem.srpgActorCommandStatusWindowNeedRefresh();
        if (!flag) {
            flag = [false, null];
        }
        if (flag[0]) {
            if (!this._mapSrpgActorCommandStatusWindow.isOpen() && !this._mapSrpgActorCommandStatusWindow.isOpening()) {
                this._mapSrpgActorCommandStatusWindow.setBattler(flag[1][1]);
            }
        } else {
            if (this._mapSrpgActorCommandStatusWindow.isOpen() && !this._mapSrpgActorCommandStatusWindow.isClosing()) {
                this._mapSrpgActorCommandStatusWindow.clearBattler();
            }
        }
        //予想ウィンドウ・戦闘開始ウィンドウの開閉
        var flag = $gameSystem.srpgBattleWindowNeedRefresh();
        if (flag[0]) {
            if (_srpgPredictionWindowMode === 3) {
                this.commandBattleStart();
                return;
            }
            if (!this._mapSrpgTargetWindow.isOpen() && !this._mapSrpgTargetWindow.isOpening()) {
                this._mapSrpgTargetWindow.setBattler(flag[2]);
                this._mapSrpgTargetWindow.open();
            }
            if (!this._mapSrpgPredictionWindow.isOpen() && !this._mapSrpgPredictionWindow.isOpening()) {
                this._mapSrpgPredictionWindow.setBattler(flag[1], flag[2]);
                this._mapSrpgPredictionWindow.open();
            }
            if (!this._mapSrpgBattleWindow.isOpen() && !this._mapSrpgBattleWindow.isOpening()) {
                this._mapSrpgBattleWindow.setup(flag[1]);
            }
        } else {
            if (this._mapSrpgTargetWindow.isOpen() && !this._mapSrpgTargetWindow.isClosing()) {
                this._mapSrpgTargetWindow.clearBattler();
                this._mapSrpgTargetWindow.close();
            }
            if (this._mapSrpgPredictionWindow.isOpen() && !this._mapSrpgPredictionWindow.isClosing()) {
                this._mapSrpgPredictionWindow.clearBattler();
                this._mapSrpgPredictionWindow.close();
            }
            if (this._mapSrpgBattleWindow.isOpen() && !this._mapSrpgBattleWindow.isClosing()) {
                this._mapSrpgBattleWindow.clearActor();
                this._mapSrpgBattleWindow.close();
                this._mapSrpgBattleWindow.deactivate();
            }
        }
        if ($gameMap.isEventRunning() == true) {
            return;
        }
        //戦闘開始の処理
        if (this._callSrpgBattle == true && this._mapSrpgBattleWindow.isClosed()) {
            this._callSrpgBattle = false;
            SceneManager.push(Scene_Battle);
            return;
        }
        //戦闘終了後の処理
        if ($gameSystem.isSubBattlePhase() === 'after_battle') {
            this.srpgBattlerDeadAfterBattle();
            this.srpgAfterAction();
            return;
        }
        //アクターフェイズの開始処理
        if ($gameSystem.isBattlePhase() === 'actor_phase' && $gameSystem.isSubBattlePhase() === 'initialize') {
            if (!this.isSrpgActorTurnEnd()) {
                $gameSystem.srpgStartAutoActorTurn(); //自動行動のアクターが行動する
            } else {
                $gameSystem.setSubBattlePhase('normal');
            }
        }
        //自動アクターフェイズの処理
        if ($gameSystem.isBattlePhase() === 'auto_actor_phase') {
            if ($gameSystem.isSubBattlePhase() === 'auto_actor_command') {
                this.srpgInvokeAutoActorCommand();
                return;
            } else if ($gameSystem.isSubBattlePhase() === 'auto_actor_move') {
                this.srpgInvokeAutoActorMove();
                return;
            } else if ($gameSystem.isSubBattlePhase() === 'auto_actor_action') {
                this.srpgInvokeAutoUnitAction();
                return;
            }
        }
        //エネミーフェイズの処理
        if ($gameSystem.isBattlePhase() === 'enemy_phase') {
            if ($gameSystem.isSubBattlePhase() === 'enemy_command') {
                this.srpgInvokeEnemyCommand();
                return;
            } else if ($gameSystem.isSubBattlePhase() === 'enemy_move') {
                this.srpgInvokeEnemyMove();
                return;
            } else if ($gameSystem.isSubBattlePhase() === 'enemy_action') {
                this.srpgInvokeAutoUnitAction();
                return;
            }
        }
    };

    //戦闘終了後の戦闘不能判定
    Scene_Map.prototype.srpgBattlerDeadAfterBattle = function() {
        var activeBattler = $gameSystem.EventToUnit($gameTemp.activeEvent().eventId())[1];
        var targetBattler = $gameSystem.EventToUnit($gameTemp.targetEvent().eventId())[1];
        activeBattler.setActionTiming(-1);
        targetBattler.setActionTiming(-1);
        if (activeBattler && activeBattler.isDead() && !$gameTemp.activeEvent().isErased()) {
            $gameTemp.activeEvent().erase();
            if (activeBattler.isActor()) {
                var oldValue = $gameVariables.value(_existActorVarID);
                $gameVariables.setValue(_existActorVarID, oldValue - 1);
            } else {
                var oldValue = $gameVariables.value(_existEnemyVarID);
                $gameVariables.setValue(_existEnemyVarID, oldValue - 1);
            }
        }
        if (targetBattler && targetBattler.isDead() && !$gameTemp.targetEvent().isErased()) {
            $gameTemp.targetEvent().erase();
            if (targetBattler.isActor()) {
                var oldValue = $gameVariables.value(_existActorVarID);
                $gameVariables.setValue(_existActorVarID, oldValue - 1);
            } else {
                var oldValue = $gameVariables.value(_existEnemyVarID);
                $gameVariables.setValue(_existEnemyVarID, oldValue - 1);
            }
        }
    };

    //行動終了時の処理
    //戦闘終了の判定はイベントで行う。
    Scene_Map.prototype.srpgAfterAction = function() {
        var battler = $gameSystem.EventToUnit($gameTemp.activeEvent().eventId())[1];
        battler.srpgCheckFloorEffect($gameTemp.activeEvent().posX(), $gameTemp.activeEvent().posY());
        if (battler.SRPGActionTimes() <= 1) {
            battler.setSrpgTurnEnd(true);
        } else {
            battler.useSRPGActionTimes(1);
        }
        
        $gameSystem.clearSrpgActorCommandWindowNeedRefresh();
        $gameSystem.clearSrpgActorCommandStatusWindowNeedRefresh();
        $gameTemp.clearMoveTable();
        $gameTemp.clearTargetEvent();
        $gameParty.clearSrpgBattleActors();
        $gameTroop.clearSrpgBattleEnemys();
        if ($gameSystem.isBattlePhase() === 'actor_phase' || $gameSystem.isBattlePhase() === 'auto_actor_phase') {
            this.eventUnitEvent();
        }
        this.eventAfterAction();
        $gameTemp.clearActiveEvent();
        if ($gameSystem.isBattlePhase() === 'actor_phase') {
            if (!this.isSrpgActorTurnEnd()) {
                $gameSystem.srpgStartAutoActorTurn(); //自動行動のアクターが行動する
            } else {
                $gameSystem.setSubBattlePhase('normal');
            }
        } else if ($gameSystem.isBattlePhase() === 'auto_actor_phase') {
            $gameSystem.setSubBattlePhase('auto_actor_command');
        } else if ($gameSystem.isBattlePhase() === 'enemy_phase') {
            $gameSystem.setSubBattlePhase('enemy_command');
        }
    };

    //ユニットイベントの実行
    Scene_Map.prototype.eventUnitEvent = function() {
        $gameMap.eventsXy($gameTemp.activeEvent().posX(), $gameTemp.activeEvent().posY()).forEach(function(event) {
            if (event.isType() === 'unitEvent') {
                if (event.pageIndex() >= 0) event.start();
                $gameTemp.pushSrpgEventList(event);
                $gameSystem.pushSearchedItemList([$gameTemp.activeEvent().posX(), $gameTemp.activeEvent().posY()]);
            }
        });
    };

    //行動前イベントの実行
    Scene_Map.prototype.eventBeforeBattle = function() {
        $gameMap.events().forEach(function(event) {
            if (event.isType() === 'beforeBattle') {
                if (event.pageIndex() >= 0) event.start();
                $gameTemp.pushSrpgEventList(event);
            }
        });
    };

    //行動後イベントの実行
    Scene_Map.prototype.eventAfterAction = function() {
        $gameMap.events().forEach(function(event) {
            if (event.isType() === 'afterAction') {
                if (event.pageIndex() >= 0) event.start();
                $gameTemp.pushSrpgEventList(event);
            }
        });
    };

    //アクターターン終了の判定
    Scene_Map.prototype.isSrpgActorTurnEnd = function() {
        return $gameMap.events().some(function(event) {
            var battlerArray = $gameSystem.EventToUnit(event._eventId);
            if (battlerArray && battlerArray[0] === 'actor') {
                return battlerArray[1].canInput();
            }
        });
    };

    //アクターコマンド・攻撃
    Scene_Map.prototype.commandAttack = function() {
        var actor = $gameSystem.EventToUnit($gameTemp.activeEvent().eventId())[1];
        actor.action(0).setAttack();
        this.startActorTargetting();
    };

    //アクターコマンド・スキル
    Scene_Map.prototype.commandSkill = function() {
        var actor = $gameSystem.EventToUnit($gameTemp.activeEvent().eventId())[1];
        this._skillWindow.setActor(actor);
        this._skillWindow.setStypeId(this._mapSrpgActorCommandWindow.currentExt());
        this._skillWindow.refresh();
        this._skillWindow.show();
        this._skillWindow.activate();
    };

    //アクターコマンド・アイテム
    Scene_Map.prototype.commandItem = function() {
        this._itemWindow.refresh();
        this._itemWindow.show();
        this._itemWindow.activate();
    };

    //アクターコマンド・装備
    Scene_Map.prototype.commandEquip = function() {
        SceneManager.push(Scene_Equip);
    };

    //アクターコマンド・待機
    Scene_Map.prototype.commandWait = function() {
        var actor = $gameSystem.EventToUnit($gameTemp.activeEvent().eventId())[1];
        actor.onAllActionsEnd();
        this.srpgAfterAction();
    };

    //アクターコマンド・キャンセル
    Scene_Map.prototype.selectPreviousActorCommand = function() {
        var event = $gameTemp.activeEvent();
        event.locate($gameTemp.originalPos()[0], $gameTemp.originalPos()[1]);
        $gameSystem.clearSrpgActorCommandWindowNeedRefresh();
        $gameSystem.setSubBattlePhase('actor_move');
    };

    //スキルコマンド・決定
    Scene_Map.prototype.onSkillOk = function() {
        var skill = this._skillWindow.item();
        var actor = $gameSystem.EventToUnit($gameTemp.activeEvent().eventId())[1];
        actor.action(0).setSkill(skill.id);
        this._skillWindow.hide();
        this.startActorTargetting();
        if (_srpgSkipTargetForSelf == 'true' && actor.action(0).isForUser()) {
            var actionBattlerArray = $gameSystem.EventToUnit($gameTemp.activeEvent().eventId());
            var targetBattlerArray = $gameSystem.EventToUnit($gameTemp.activeEvent().eventId());
            SoundManager.playOk();
            $gameSystem.clearSrpgActorCommandStatusWindowNeedRefresh();
            if (_srpgPredictionWindowMode != 3) $gameSystem.setSrpgStatusWindowNeedRefresh(actionBattlerArray);
            $gameSystem.setSrpgBattleWindowNeedRefresh(actionBattlerArray, targetBattlerArray);
            $gameTemp.setSrpgDistance($gameSystem.unitDistance($gameTemp.activeEvent(), $gameTemp.activeEvent()));
            $gameTemp.setTargetEvent($gameTemp.activeEvent());
            $gameSystem.setSubBattlePhase('battle_window');
        }
    };

    //スキルコマンド・キャンセル
    Scene_Map.prototype.onSkillCancel = function() {
        this._skillWindow.hide();
        this._mapSrpgActorCommandWindow.activate();
    };

    //アイテムコマンド・決定
    Scene_Map.prototype.onItemOk = function() {
        var item = this._itemWindow.item();
        var actor = $gameSystem.EventToUnit($gameTemp.activeEvent().eventId())[1];
        actor.action(0).setItem(item.id);
        this._itemWindow.hide();
        this.startActorTargetting();
    };

    //アイテムコマンド・キャンセル
    Scene_Map.prototype.onItemCancel = function() {
        this._itemWindow.hide();
        this._mapSrpgActorCommandWindow.activate();
    };

    //ターゲットの選択開始
    Scene_Map.prototype.startActorTargetting = function() {
        var event = $gameTemp.activeEvent();
        var battler = $gameSystem.EventToUnit($gameTemp.activeEvent().eventId())[1];
        var skill = battler.currentAction().item();
        $gameTemp.clearMoveTable();
        $gameTemp.initialRangeTable(event.posX(), event.posY(), battler.srpgMove());
        event.makeRangeTable(event.posX(), event.posY(), battler.srpgSkillRange(skill), [0], event.posX(), event.posY(), skill);
        $gameTemp.minRangeAdapt(event.posX(), event.posY(), battler.srpgSkillMinRange(skill));
        $gameTemp.pushRangeListToMoveList();
        $gameTemp.setResetMoveList(true);
        $gameSystem.clearSrpgActorCommandWindowNeedRefresh();
        $gameSystem.setSubBattlePhase('actor_target');
    };

    //戦闘開始コマンド・戦闘開始
    Scene_Map.prototype.commandBattleStart = function() {
        var actionArray = $gameSystem.srpgBattleWindowNeedRefresh()[1];
        var targetArray = $gameSystem.srpgBattleWindowNeedRefresh()[2];
        $gameSystem.clearSrpgStatusWindowNeedRefresh();
        $gameSystem.clearSrpgBattleWindowNeedRefresh();
        $gameSystem.setSubBattlePhase('invoke_action');
        this.srpgBattleStart(actionArray, targetArray);
    };

    //戦闘開始コマンド・キャンセル
    Scene_Map.prototype.selectPreviousSrpgBattleStart = function() {
        var battlerArray = $gameSystem.srpgBattleWindowNeedRefresh()[1];
        $gameSystem.setSrpgActorCommandStatusWindowNeedRefresh(battlerArray);
        $gameSystem.clearSrpgStatusWindowNeedRefresh();
        $gameSystem.clearSrpgBattleWindowNeedRefresh();
        $gameTemp.setSrpgDistance(0);
        $gameTemp.clearTargetEvent();
        $gameSystem.setSubBattlePhase('actor_target');
        if (_srpgSkipTargetForSelf == 'true' && battlerArray[1].action(0).isForUser()) {
            var event = $gameTemp.activeEvent();
            $gameTemp.clearMoveTable();
            $gameTemp.initialMoveTable($gameTemp.originalPos()[0], $gameTemp.originalPos()[1], battlerArray[1].srpgMove());
            event.makeMoveTable($gameTemp.originalPos()[0], $gameTemp.originalPos()[1], battlerArray[1].srpgMove(), [0], battlerArray[1].srpgThroughTag());
            var list = $gameTemp.moveList();
            for (var i = 0; i < list.length; i++) {
                var pos = list[i];
                var flag = $gameSystem.areTheyNoUnits(pos[0], pos[1], '');
                if (flag == true && _srpgBestSearchRouteSize > 0) event.makeRangeTable(pos[0], pos[1], battlerArray[1].srpgWeaponRange(), [0], pos[0], pos[1], $dataSkills[battlerArray[1].attackSkillId()]);
            }
            $gameTemp.pushRangeListToMoveList();
            $gameTemp.setResetMoveList(true);
            $gameSystem.setSrpgActorCommandWindowNeedRefresh(battlerArray);
            $gameSystem.setSubBattlePhase('actor_command_window');
        }
    };

    //メニューからのターン終了処理
    Scene_Map.prototype.menuActorTurnEnd = function() {
        for (var i = 1; i <= $gameMap.isMaxEventId(); i++) {
            var event = $gameMap.event(i);
            if (event && event.isType() === 'actor') {
                var actor = $gameSystem.EventToUnit(event.eventId());
                if (actor && actor[1] && actor[1].canInput() == true && !actor[1].srpgTurnEnd()) {
                    if ($gameTemp.isAutoBattleFlag() == true) {
                        actor[1].addState(_srpgAutoBattleStateId);
                    } else {
                        $gameTemp.setActiveEvent(event);
                        actor[1].onAllActionsEnd();
                        actor[1].useSRPGActionTimes(99);
                        this.srpgAfterAction();
                    }
                }
            }
        }
        $gameTemp.setAutoBattleFlag(false);
        if ($gameSystem.isBattlePhase() === 'actor_phase') {
            if (!this.isSrpgActorTurnEnd()) {
                $gameSystem.srpgStartAutoActorTurn(); //自動行動のアクターが行動する
            } else {
                $gameSystem.setSubBattlePhase('normal');
            }
        } else if ($gameSystem.isBattlePhase() === 'auto_actor_phase') {
            $gameSystem.setSubBattlePhase('auto_actor_command');
        } else if ($gameSystem.isBattlePhase() === 'enemy_phase') {
            $gameSystem.setSubBattlePhase('enemy_command');
        }
        $gameTemp.setTurnEndFlag(false); // 処理終了
        return;
    };

    //アクターコマンドからの装備変更の後処理
    Scene_Map.prototype.srpgAfterActorEquip = function() {
        var event = $gameTemp.activeEvent();
        var battlerArray = $gameSystem.EventToUnit(event.eventId());
        $gameTemp.clearMoveTable();
        $gameTemp.initialMoveTable($gameTemp.originalPos()[0], $gameTemp.originalPos()[1], battlerArray[1].srpgMove());
        event.makeMoveTable($gameTemp.originalPos()[0], $gameTemp.originalPos()[1], battlerArray[1].srpgMove(), [0], battlerArray[1].srpgThroughTag());
        var list = $gameTemp.moveList();
        for (var i = 0; i < list.length; i++) {
            var pos = list[i];
            var flag = $gameSystem.areTheyNoUnits(pos[0], pos[1], '');
            if (flag == true && _srpgBestSearchRouteSize > 0) event.makeRangeTable(pos[0], pos[1], battlerArray[1].srpgWeaponRange(), [0], pos[0], pos[1], $dataSkills[battlerArray[1].attackSkillId()]);
        }
        $gameTemp.pushRangeListToMoveList();
        $gameTemp.setResetMoveList(true);
        $gameTemp.setSrpgActorEquipFlag(false); // 処理終了
        return;
    };

    //自動行動アクターの行動決定
    Scene_Map.prototype.srpgInvokeAutoActorCommand = function() {
        for (var i = 1; i <= $gameMap.isMaxEventId() + 1; i++) {
            var event = $gameMap.event(i);
            if (event && event.isType() === 'actor') {
                var actorArray = $gameSystem.EventToUnit(event.eventId());
                if (actorArray) {
                    var actor = actorArray[1];
                    if (actor && actor.canMove() == true && !actor.srpgTurnEnd()) {
                        break;
                    }
                }
            }
            if (i > $gameMap.isMaxEventId()) {
                $gameSystem.srpgStartEnemyTurn(); // エネミーターンの開始
                return;
            }
        }
        // mode:standの場合、行動開始するか判定する（通常攻撃の範囲内に対立ユニットがいるか）
        if (_srpgStandUnitSkip === 'true' && actor.battleMode() === 'stand') {
            actor.setActionAttack();
            var targetType = this.makeTargetType(actor, 'actor');
            $gameTemp.setActiveEvent(event);
            $gameSystem.srpgMakeMoveTable(event);
            var canAttackTargets = this.srpgMakeCanAttackTargets(actor, targetType); //行動対象としうるユニットのリストを作成
            $gameTemp.clearMoveTable();
            if (canAttackTargets.length > 0 || actor.hpRate() < 1.0) {
                actor.setBattleMode('normal');
            } else {
                $gameTemp.setActiveEvent(event);
                actor.onAllActionsEnd();
                this.srpgAfterAction();
                return;
            }
        }
        // 行動を設定する
        actor.makeActions();
        if (actor.isConfused()) {
            actor.makeConfusionActions();
        }
        if (actor.action(0).item()) {
            $gameTemp.setAutoMoveDestinationValid(true);
            $gameTemp.setAutoMoveDestination(event.posX(), event.posY());
            $gameTemp.setActiveEvent(event);
            $gameSystem.setSubBattlePhase('auto_actor_move');
        } else {
            $gameTemp.setActiveEvent(event);
            actor.onAllActionsEnd();
            this.srpgAfterAction();
        }
    };

    //自動行動アクターの移動先決定と移動実行
    Scene_Map.prototype.srpgInvokeAutoActorMove = function() {
        var event = $gameTemp.activeEvent();
        var type = $gameSystem.EventToUnit(event.eventId())[0];
        var actor = $gameSystem.EventToUnit(event.eventId())[1];
        var targetType = this.makeTargetType(actor, type);
        $gameSystem.srpgMakeMoveTable(event);
        this.srpgPriorityTarget(actor); //優先ターゲットの設定
        var canAttackTargets = this.srpgMakeCanAttackTargets(actor, targetType); //行動対象としうるユニットのリストを作成
        var targetEvent = this.srpgDecideTarget(canAttackTargets, event, targetType); //ターゲットの設定
        $gameTemp.setTargetEvent(targetEvent);
        if ($gameTemp.isSrpgBestSearchFlag() == true) {
            $gameTemp.setSrpgBestSearchFlag(false);
            $gameSystem.srpgMakeMoveTable(event);
        }
        var optimalPos = this.srpgSearchOptimalPos(targetEvent, actor, type);
        var route = $gameTemp.MoveTable(optimalPos[0], optimalPos[1])[1];
        $gameSystem.setSrpgWaitMoving(true);
        event.srpgMoveRouteForce(route);
        $gameSystem.setSubBattlePhase('auto_actor_action');
    };

    //エネミーの行動決定
    Scene_Map.prototype.srpgInvokeEnemyCommand = function() {
        for (var i = 1; i <= $gameMap.isMaxEventId() + 1; i++) {
            var event = $gameMap.event(i);
            if (event && event.isType() === 'enemy') {
                var enemy = $gameSystem.EventToUnit(event.eventId())[1];
                if (enemy.canMove() == true && !enemy.srpgTurnEnd()) {
                    break;
                }
            }
            if (i > $gameMap.isMaxEventId()) {
                $gameSystem.srpgTurnEnd(); // ターンを終了する
                return;
            }
        }
        // mode:standの場合、行動開始するか判定する（通常攻撃の範囲内に対立ユニットがいるか）
        if (_srpgStandUnitSkip === 'true' && enemy.battleMode() === 'stand') {
            enemy.setActionAttack();
            var targetType = this.makeTargetType(enemy, 'enemy');
            $gameTemp.setActiveEvent(event);
            $gameSystem.srpgMakeMoveTable(event);
            var canAttackTargets = this.srpgMakeCanAttackTargets(enemy, targetType); //行動対象としうるユニットのリストを作成
            $gameTemp.clearMoveTable();
            if (canAttackTargets.length > 0 || enemy.hpRate < 1.0) {
                enemy.setBattleMode('normal');
            } else {
                $gameTemp.setActiveEvent(event);
                enemy.onAllActionsEnd();
                this.srpgAfterAction();
                return;
            }
        }
        // 行動を設定する
        enemy.makeSrpgActions();
        if (enemy.action(0).item()) {
            $gameTemp.setAutoMoveDestinationValid(true);
            $gameTemp.setAutoMoveDestination(event.posX(), event.posY());
            $gameTemp.setActiveEvent(event);
            $gameSystem.setSubBattlePhase('enemy_move');
        } else {
            $gameTemp.setActiveEvent(event);
            enemy.onAllActionsEnd();
            this.srpgAfterAction();
        }
    };

    //エネミーの移動先決定と移動実行
    Scene_Map.prototype.srpgInvokeEnemyMove = function() {
        var event = $gameTemp.activeEvent();
        var type = $gameSystem.EventToUnit(event.eventId())[0];
        var enemy = $gameSystem.EventToUnit(event.eventId())[1];
        var targetType = this.makeTargetType(enemy, type);
        $gameSystem.srpgMakeMoveTable(event);
        this.srpgPriorityTarget(enemy); //優先ターゲットの設定
        var canAttackTargets = this.srpgMakeCanAttackTargets(enemy, targetType); //行動対象としうるユニットのリストを作成
        var targetEvent = this.srpgDecideTarget(canAttackTargets, event, targetType); //ターゲットの設定
        $gameTemp.setTargetEvent(targetEvent);
        if ($gameTemp.isSrpgBestSearchFlag() == true) {
            $gameTemp.setSrpgBestSearchFlag(false);
            $gameSystem.srpgMakeMoveTable(event);
        }
        var optimalPos = this.srpgSearchOptimalPos(targetEvent, enemy, type);
        var route = $gameTemp.MoveTable(optimalPos[0], optimalPos[1])[1];
        $gameSystem.setSrpgWaitMoving(true);
        event.srpgMoveRouteForce(route);
        $gameSystem.setSubBattlePhase('enemy_action');
    };

    // 行動対象とするユニットのタイプを返す
    Scene_Map.prototype.makeTargetType = function(battler, type) {
        var targetType = null;
        if (battler.isConfused() == true) {
            switch (battler.confusionLevel()) {
            case 1:
                if (type === 'enemy') {
                    return 'actor';
                } else if (type === 'actor') {
                    return 'enemy';
                }
            case 2:
                if (Math.randomInt(2) === 0) {
                    if (type === 'enemy') {
                        return 'actor';
                    } else if (type === 'actor') {
                        return 'enemy';
                    }
                }
                if (type === 'enemy') {
                    return 'enemy';
                } else if (type === 'actor') {
                    return 'actor';
                }
            default:
                if (type === 'enemy') {
                    return 'enemy';
                } else if (type === 'actor') {
                    return 'actor';
                }
            }
        }
        if (type === 'enemy' && battler.currentAction().isForOpponent()) {
            targetType = 'actor';
        } else if (type === 'enemy' && battler.currentAction().isForFriend()) {
            targetType = 'enemy';
        } else if (type === 'actor' && battler.currentAction().isForOpponent()) {
            targetType = 'enemy';
        } else if (type === 'actor' && battler.currentAction().isForFriend()) {
            targetType = 'actor';
        }
        return targetType;
    };

    // 移動力と射程を足した範囲内にいる対象をリストアップする
    Scene_Map.prototype.srpgMakeCanAttackTargets = function(battler, targetType) {
        var moveRangeList = $gameTemp.moveList();
        var targetList = [];
        // 対象：使用者であれば、自分だけを対象に含める
        if (battler.currentAction().isForUser()) {
            targetList.push($gameTemp.activeEvent());
            return targetList;
        }
        // 対象をリストアップする：優先ターゲットが設定されている場合は、そのイベントのみリストに加える
        for (var i = 0; i < moveRangeList.length; i++) {
            var pos =  moveRangeList[i];
            var events = $gameMap.eventsXyNt(pos[0], pos[1]);
            for (var j = 0; j < events.length; j++) {
                var event = events[j];
                if (event.isType() === targetType && !event.isErased() &&
                    targetList.indexOf(event) === -1) {
                    if (!battler.isConfused() || $gameTemp.activeEvent() != event) {
                        if ($gameTemp.isSrpgPriorityTarget()) {
                            if ($gameTemp.isSrpgPriorityTarget() == event) targetList.push(event);
                        } else {
                            targetList.push(event);
                        }
                    }
                }
            }
        }
        return targetList;
    };

     //優先ターゲットの決定
    Scene_Map.prototype.srpgPriorityTarget = function(battler) {
        var event = null;
        if (battler.battleMode() === 'aimingEvent') {
            event = $gameMap.event(battler.targetId());
        } else if (battler.battleMode() === 'aimingActor') {
            var eventId1 = $gameSystem.ActorToEvent(battler.targetId());
            event = $gameMap.event(eventId1);
        }
        // ターゲットにしたeventが有効でない場合、優先ターゲットは設定しない
        if (event) { 
            var targetBattlerArray = $gameSystem.EventToUnit(event.eventId());
            // 優先ターゲットが失われている場合、優先ターゲットは設定しない
            if (!(targetBattlerArray && targetBattlerArray[1].isAlive())) event = null;
        }
        $gameTemp.setSrpgPriorityTarget(event);
    }

     //ターゲットの決定
    Scene_Map.prototype.srpgDecideTarget = function(canAttackTargets, activeEvent, targetType) {
        var targetEvent = null;
        // 攻撃対象としうる相手がいない場合　
        if (canAttackTargets.length === 0) {
            // 攻撃対象としうる相手がいない場合　遠距離の相手を探索する：優先ターゲットがいる場合、そのイベントのみ探索する
            if (_srpgBestSearchRouteSize > 0) {
                var battler = $gameSystem.EventToUnit(activeEvent.eventId())[1];
                var array = [];
                array[_srpgBestSearchRouteSize] = -1;
                $gameTemp.setSrpgBestSearchRoute([null, array, '']);
                $gameTemp.clearMoveTable();
                $gameTemp.initialMoveTable(activeEvent.posX(), activeEvent.posY(), battler.srpgMove());
                $gameTemp.setSrpgBestSearchFlag(true);
                activeEvent.makeMoveTable(activeEvent.posX(), activeEvent.posY(), _srpgBestSearchRouteSize, [0], battler.srpgThroughTag());
                if ($gameTemp.isSrpgBestSearchRoute()[0]) return $gameTemp.isSrpgBestSearchRoute()[0];
            }
            // 攻撃対象としうる相手がいない場合　次いで最短距離にいる相手を設定する
            var minDis = 9999;
            var events = $gameMap.events();
            for (var i = 0; i <  events.length; i++) {
                var event = events[i];
                var dis = $gameSystem.unitDistance(activeEvent, event);
                if (event.isType() === targetType && !event.isErased() && dis < minDis &&
                    $gameTemp.activeEvent() != event) {
                    minDis = dis;
                    targetEvent = event;
                }
            }
            return targetEvent;
        }
        // HP回復スキルの場合、最もHP割合が低い相手を選ぶ
        var user = $gameSystem.EventToUnit(activeEvent.eventId())[1];
        if (user.currentAction().isRecover() == true) {
            var lowerHpUnit = [];
            var lowerHpRate = 100;
            canAttackTargets.forEach(function(event) {
                var battler = $gameSystem.EventToUnit(event.eventId())[1];
                if (battler.hpRate() == lowerHpRate) {
                    lowerHpUnit.push(event);
                } else if (battler.hpRate() < lowerHpRate) {
                    lowerHpUnit = [];
                    lowerHpUnit.push(event);
                    lowerHpRate = battler.hpRate();
                }
            });
            if (lowerHpUnit.length > 0) {
                targetEvent = lowerHpUnit[Math.randomInt(lowerHpUnit.length)];
                return targetEvent;
            }
        }
        // 攻撃対象としうる相手がいる場合
        var sum = canAttackTargets.reduce(function(r, event) {
            var battler = $gameSystem.EventToUnit(event.eventId())[1];
            return r + battler.tgr;
        }, 0);
        var tgrRand = Math.random() * sum;
        canAttackTargets.forEach(function(event) {
            var battler = $gameSystem.EventToUnit(event.eventId())[1];
            tgrRand -= battler.tgr;
            if (tgrRand <= 0 && !targetEvent) {
                targetEvent = event;
            }
        });
        return targetEvent;
    };

    // 最適移動位置の探索
    Scene_Map.prototype.srpgSearchOptimalPos = function(targetEvent, battler, type) {
        if ($gameTemp.isSrpgBestSearchRoute()[0] && 
            !(battler.battleMode() === 'absRegionUp' || battler.battleMode() === 'absRegionDown')) {
            var route = $gameTemp.isSrpgBestSearchRoute()[1].slice(1, battler.srpgMove() + 1);
            for (var i = 0; i < battler.srpgMove() + 1; i++) {
                var pos = [$gameTemp.activeEvent().posX(), $gameTemp.activeEvent().posY()];
                for (var j = 0; j < route.length; j++) {
                    var d = route[j];
                    if (d == 2) {
                        pos[1] += 1;
                    } else if (d == 4) {
                        pos[0] -= 1;
                    } else if (d == 6) {
                        pos[0] += 1;
                    } else if (d == 8) {
                        pos[1] -= 1;
                    }
                }
                if (pos[0] < 0) {
                  pos[0] += $gameMap.width();
                } else if (pos[0] >= $gameMap.width()) {
                  pos[0] -= $gameMap.width();
                }
                if (pos[1] < 0) {
                  pos[1] += $gameMap.height();
                } else if (pos[1] >= $gameMap.height()) {
                  pos[1] -= $gameMap.height();
                }
                if ($gameSystem.areTheyNoUnits(pos[0], pos[1], $gameTemp.activeEvent().isType()) == true) {
                    break;
                } else {
                    route.pop();
                }
            }
            $gameTemp.setSrpgBestSearchRoute([null, [], '']);
            return pos;
        }
        var list = $gameTemp.moveList();
        var skill = battler.currentAction().item();
        var range = battler.srpgSkillRange(skill);
        var minRange = battler.srpgSkillMinRange(skill);
        var candidatePos = [];
        var optimalDis = -9999;
        var optimalResion = $gameMap.regionId($gameTemp.activeEvent().posX(), $gameTemp.activeEvent().posY());
        if (battler.searchItem()) {
            var searchItem = battler.searchItem();
        } else {
            var searchItem = false;
        }
        //自分自身がターゲットの場合 or ターゲットがいない場合 or リージョンアップ/ダウンを優先する場合
        if ($gameTemp.activeEvent() == targetEvent || !targetEvent ||
            battler.battleMode() === 'absRegionUp' || battler.battleMode() === 'absRegionDown') {
            if (battler.battleMode() === 'regionUp' || battler.battleMode() === 'regionDown' ||
                battler.battleMode() === 'absRegionUp' || battler.battleMode() === 'absRegionDown') {
                for (var i = 0; i < list.length; i++) {
                    var pos = list[i];
                    if (pos[2] == false && $gameSystem.areTheyNoUnits(pos[0], pos[1], type)) {
                        if ((battler.battleMode() === 'regionUp' || battler.battleMode() === 'absRegionUp') && 
                            $gameMap.regionId(pos[0], pos[1]) >= optimalResion) {
                            candidatePos = [];
                            optimalResion = $gameMap.regionId(pos[0], pos[1]);
                            candidatePos.push([pos[0], pos[1]]);
                        } else if ((battler.battleMode() === 'regionDown' || battler.battleMode() === 'absRegionDown') &&
                                   $gameMap.regionId(pos[0], pos[1]) <= optimalResion) {
                            candidatePos = [];
                            optimalResion = $gameMap.regionId(pos[0], pos[1]);
                            candidatePos.push([pos[0], pos[1]]);
                        }
                    }
                }
            } else {
                candidatePos = [];
                candidatePos.push([$gameTemp.activeEvent().posX(), $gameTemp.activeEvent().posY()]);
            }
        } else { // ターゲットがいる場合
// 将来的な拡張
//            if (battler.battleMode() === 'normal' || battler.battleMode() === 'stand' ||
//            battler.battleMode() === 'regionUp' || battler.battleMode() === 'regionDown') {
            for (var i = 0; i < list.length; i++) {
                var pos = list[i];
                if (pos[2] == false && $gameSystem.areTheyNoUnits(pos[0], pos[1], type)) {
                    var minDisX = Math.abs(pos[0] - targetEvent.posX());
                    var minDisY = Math.abs(pos[1] - targetEvent.posY());
                    if ($gameMap.isLoopHorizontal() == true) {
                        var pos0X = pos[0] > targetEvent.posX() ? pos[0] - $gameMap.width() : pos[0] + $gameMap.width();
                        var disX = Math.abs(pos0X - targetEvent.posX());
                        minDisX = minDisX < disX ? minDisX : disX;
                    }
                    if ($gameMap.isLoopVertical() == true) {
                        var pos1Y = pos[1] > targetEvent.posY() ? pos[1] - $gameMap.height() : pos[1] + $gameMap.height();
                        var disY = Math.abs(pos1Y - targetEvent.posY());
                        minDisY = minDisY < disY ? minDisY : disY;
                    }
                    var dis = minDisX + minDisY;
                    var check = range - dis;
                    var specialRange = $gameTemp.activeEvent().srpgRangeExtention(targetEvent.posX(), targetEvent.posY(), pos[0], pos[1], skill, range);
                    if (check === optimalDis && specialRange == true) {
                        candidatePos.push([pos[0], pos[1]]);
                    } else if (check === 0 && minRange <= dis && specialRange == true) {
                        searchItem = false;
                        candidatePos = [];
                        optimalDis = check;
                        candidatePos.push([pos[0], pos[1]]);
                    } else if ((check > 0 && optimalDis > 0) && check < optimalDis && minRange <= dis && specialRange == true) {
                        candidatePos = [];
                        optimalDis = check;
                        candidatePos.push([pos[0], pos[1]]);
                    } else if (check > 0 && optimalDis < 0 && minRange <= dis && specialRange == true) {
                        candidatePos = [];
                        optimalDis = check;
                        candidatePos.push([pos[0], pos[1]]);
                    } else if ((check < 0 && optimalDis < 0) && check > optimalDis) {
                        if (battler.battleMode() === 'normal' || battler.battleMode() === 'aimingEvent' ||
                            battler.battleMode() === 'aimingActor') {
                            candidatePos = [];
                            optimalDis = check;
                            candidatePos.push([pos[0], pos[1]]);
                        } else if (battler.battleMode() === 'stand') {
                            candidatePos = [];
                            candidatePos.push([$gameTemp.activeEvent().posX(), $gameTemp.activeEvent().posY()]);
                        } else if (battler.battleMode() === 'regionUp' && 
                                   $gameMap.regionId(pos[0], pos[1]) >= optimalResion) {
                            candidatePos = [];
                            optimalResion = $gameMap.regionId(pos[0], pos[1]);
                            candidatePos.push([pos[0], pos[1]]);
                        } else if (battler.battleMode() === 'regionDown' &&
                                   $gameMap.regionId(pos[0], pos[1]) <= optimalResion) {
                            candidatePos = [];
                            optimalResion = $gameMap.regionId(pos[0], pos[1]);
                            candidatePos.push([pos[0], pos[1]]);
                        }
                    }
                }
            }
            // 最適移動位置がからの場合、移動しない
            if (candidatePos.length == 0) {
                candidatePos.push([$gameTemp.activeEvent().posX(), $gameTemp.activeEvent().posY()]);
            }
        }
        // アイテムサーチの場合（最適な行動位置(check === optimalDis)がある場合は飛ばす）
        // &一度行った場所にはいかない
        if (searchItem == true) {
            for (var i = 0; i < list.length; i++) {
                var pos = list[i];
                if (pos[2] == false && $gameSystem.areTheyNoUnits(pos[0], pos[1], type)) {
                    if ($gameSystem.isThereEventUnit(pos[0], pos[1]) && $gameSystem.indexOfSearchedItemList([pos[0], pos[1]]) < 0) {
                        candidatePos = [];
                        candidatePos.push([pos[0], pos[1]]);
                    }
                }
            }
        }
        return candidatePos[Math.randomInt(candidatePos.length)];
    };

    //自動行動アクター&エネミーの戦闘の実行
    Scene_Map.prototype.srpgInvokeAutoUnitAction = function() {
        if (!$gameTemp.targetEvent()) {
            var actionArray = $gameSystem.EventToUnit($gameTemp.activeEvent().eventId());
            actionArray[1].onAllActionsEnd();
            this.srpgAfterAction();
            return;
        }
        var actionArray = $gameSystem.EventToUnit($gameTemp.activeEvent().eventId());
        var targetArray = $gameSystem.EventToUnit($gameTemp.targetEvent().eventId());
        var skill = actionArray[1].currentAction().item();
        $gameTemp.setSrpgDistance($gameSystem.unitDistance($gameTemp.activeEvent(), $gameTemp.targetEvent()));
        if (actionArray[1].canUse(skill)) {
            $gameTemp.setAutoMoveDestinationValid(true);
            $gameTemp.setAutoMoveDestination($gameTemp.targetEvent().posX(), $gameTemp.targetEvent().posY());
            $gameSystem.setSubBattlePhase('invoke_action');
            this.srpgBattleStart(actionArray, targetArray);
        } else {
            actionArray[1].onAllActionsEnd();
            this.srpgAfterAction();
        }
    };

    //戦闘処理の実行
    Scene_Map.prototype.srpgBattleStart = function(actionArray, targetArray) {
        $gameParty.clearSrpgBattleActors();
        $gameTroop.clearSrpgBattleEnemys();
        if (actionArray[0] === 'actor') {
            $gameParty.pushSrpgBattleActors(actionArray[1]);
            if (targetArray[0] === 'actor') {
                if (actionArray[1] != targetArray[1]) {
                    $gameParty.pushSrpgBattleActors(targetArray[1]);
                    actionArray[1].action(0).setTarget(1);
                } else {
                    actionArray[1].action(0).setTarget(0);
                }
            } else if (targetArray[0] === 'enemy') {
                $gameTroop.pushSrpgBattleEnemys(targetArray[1]);
                actionArray[1].action(0).setTarget(0);
            }
        } else if (actionArray[0] === 'enemy') {
            $gameTroop.pushSrpgBattleEnemys(actionArray[1]);
            actionArray[1].action(0).setSrpgEnemySubject(0);
            if (targetArray[0] === 'actor') {
                $gameParty.pushSrpgBattleActors(targetArray[1]);
                actionArray[1].action(0).setTarget(0);
            } else if (targetArray[0] === 'enemy') {
                if (actionArray[1] != targetArray[1]) {
                    $gameTroop.pushSrpgBattleEnemys(targetArray[1]);
                    actionArray[1].action(0).setTarget(1);
                } else {
                    actionArray[1].action(0).setTarget(0);
                }
            }
        }
        actionArray[1].setActionTiming(0);
        if ($dataTroops[_srpgTroopID]) {
            BattleManager.setup(_srpgTroopID, false, true);
        } else {
            BattleManager.setup(1, false, true);
        }
        //対象の行動を設定
        if (actionArray[1] != targetArray[1]) {
            targetArray[1].srpgMakeNewActions();
            if (actionArray[0] === 'actor' && targetArray[0] === 'enemy' &&
                targetArray[1].canMove()) {
                targetArray[1].action(0).setSrpgEnemySubject(0);
                targetArray[1].action(0).setAttack();
                targetArray[1].action(0).setTarget(0);
            }
            if (actionArray[0] === 'enemy' && targetArray[0] === 'actor' &&
                targetArray[1].canMove()) {
                targetArray[1].action(0).setAttack();
                targetArray[1].action(0).setTarget(0);
            }
            targetArray[1].setActionTiming(1);
        }
        if (actionArray[0] != targetArray[0] && actionArray[1].currentAction().item().meta.srpgUncounterable) {
            targetArray[1].clearActions();
        }
        this.preBattleSetDirection();
        //行動回数追加スキルなら行動回数を追加する
        var addActionNum = Number(actionArray[1].action(0).item().meta.addActionTimes);
        if (addActionNum && addActionNum > 0) {
            actionArray[1].SRPGActionTimesAdd(addActionNum);
        }
        this._callSrpgBattle = true;
        this.eventBeforeBattle();
    };

    // 戦闘開始時に向きを修正する
    Scene_Map.prototype.preBattleSetDirection = function() {
        if ($gameTemp.activeEvent() == $gameTemp.targetEvent()) return;  // 自分自身の時は向きを修正しない
        var differenceX = $gameTemp.activeEvent().posX() - $gameTemp.targetEvent().posX();
        var differenceY = $gameTemp.activeEvent().posY() - $gameTemp.targetEvent().posY();
        if ($gameMap.isLoopHorizontal() == true) {
            var event1X = $gameTemp.activeEvent().posX() > $gameTemp.targetEvent().posX() ? $gameTemp.activeEvent().posX() - $gameMap.width() : $gameTemp.activeEvent().posX() + $gameMap.width();
            var disX = event1X - $gameTemp.targetEvent().posX();
            differenceX = Math.abs(differenceX) < Math.abs(disX) ? differenceX : disX;
        }
        if ($gameMap.isLoopVertical() == true) {
            var event1Y = $gameTemp.activeEvent().posY() > $gameTemp.targetEvent().posY() ? $gameTemp.activeEvent().posY() - $gameMap.height() : $gameTemp.activeEvent().posY() + $gameMap.height();
            var disY = event1Y - $gameTemp.targetEvent().posY();
            differenceY = Math.abs(differenceY) < Math.abs(disY) ? differenceY : disY;
        }
        if (Math.abs(differenceX) > Math.abs(differenceY)) {
            if (differenceX > 0) {
                $gameTemp.activeEvent().setDirection(4);
                if (_srpgDamageDirectionChange == 'true') $gameTemp.targetEvent().setDirection(6);
            } else {
                $gameTemp.activeEvent().setDirection(6);
                if (_srpgDamageDirectionChange == 'true') $gameTemp.targetEvent().setDirection(4);
            }
        } else {
            if (differenceY >= 0) {
                $gameTemp.activeEvent().setDirection(8);
                if (_srpgDamageDirectionChange == 'true') $gameTemp.targetEvent().setDirection(2);
            } else {
                $gameTemp.activeEvent().setDirection(2);
                if (_srpgDamageDirectionChange == 'true') $gameTemp.targetEvent().setDirection(8);
            }
        }
    };

    // SRPG戦闘中は戦闘開始エフェクトを高速化する
    var _SRPG_SceneMap_startEncounterEffect = Scene_Map.prototype.startEncounterEffect;
    Scene_Map.prototype.startEncounterEffect = function() {
        if ($gameSystem.isSRPGMode() == true && _srpgBattleQuickLaunch == 'true') {
            this._encounterEffectDuration = this.encounterEffectSpeed();
        } else {
            _SRPG_SceneMap_startEncounterEffect.call(this);
        }
    };

    // SRPG戦闘中は戦闘開始エフェクトを高速化する
    var _SRPG_SceneMap_updateEncounterEffect = Scene_Map.prototype.updateEncounterEffect;
    Scene_Map.prototype.updateEncounterEffect = function() {
        if ($gameSystem.isSRPGMode() == true && $gameSwitches.value(2) == true) {
            if (this._encounterEffectDuration > 0) {
                this._encounterEffectDuration--;
                this.snapForBattleBackground();
                BattleManager.playBattleBgm();
            }
        } else if ($gameSystem.isSRPGMode() == true && _srpgBattleQuickLaunch == 'true') {
            if (this._encounterEffectDuration > 0) {
                this._encounterEffectDuration--;
                var speed = this.encounterEffectSpeed();
                var n = speed - this._encounterEffectDuration;
                if (n === Math.floor(speed)) {
                    BattleManager.playBattleBgm();
                    this.startFadeOut(this.fadeSpeed() / 2);
                }
            }
        } else {
            _SRPG_SceneMap_updateEncounterEffect.call(this);
        }
    };

    // SRPG戦闘中は戦闘開始エフェクトを高速化する
    var _SRPG_SceneMap_encounterEffectSpeed = Scene_Map.prototype.encounterEffectSpeed;
    Scene_Map.prototype.encounterEffectSpeed = function() {
        if ($gameSystem.isSRPGMode() == true && _srpgBattleQuickLaunch == 'true') {
            return 10;
        } else {
            return _SRPG_SceneMap_encounterEffectSpeed.call(this);
        }
    };

//====================================================================
// ●Scene_Menu
//====================================================================
    Scene_Menu.prototype.update = function() {
        Scene_Base.prototype.update.call(this);
        if (this._winLoseConditionWindow.isOpen()) this.updateWinLoseCondition();
    };

    Scene_Menu.prototype.updateWinLoseCondition = function() {
        if (Input.isTriggered('ok') || TouchInput.isTriggered()) {
            this._winLoseConditionWindow.close();
            this._commandWindow.activate();
        }
    };

    var _SRPG_SceneMenu_create = Scene_Menu.prototype.create;
    Scene_Menu.prototype.create = function() {
        _SRPG_SceneMenu_create.call(this);
        this.createWinLoseWindow();
    };

    Scene_Menu.prototype.createWinLoseWindow = function() {
        this._winLoseConditionWindow = new Window_WinLoseCondition(0, 0);
        this.addWindow(this._winLoseConditionWindow);
    };

    var _SRPG_SceneMenu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        _SRPG_SceneMenu_createCommandWindow.call(this);
        if ($gameSystem.isSRPGMode() == true) {
            this._commandWindow.setHandler('turnEnd',this.commandTurnEnd.bind(this));
            this._commandWindow.setHandler('autoBattle',this.commandAutoBattle.bind(this));
            this._commandWindow.setHandler('winLoseCondition',this.commandWinLoseCondition.bind(this));
        }
    };

    Scene_Menu.prototype.commandTurnEnd = function() {
        $gameTemp.setTurnEndFlag(true);
        $gameTemp.setAutoBattleFlag(false);
        SceneManager.pop();
    };

    Scene_Menu.prototype.commandAutoBattle = function() {
        $gameTemp.setTurnEndFlag(true);
        $gameTemp.setAutoBattleFlag(true);
        SceneManager.pop();
    };

    Scene_Menu.prototype.commandWinLoseCondition = function() {
        this._commandWindow.deactivate();
        this._winLoseConditionWindow.open();
    };

//====================================================================
// ●Scene_Equip
//====================================================================
    Scene_Equip.prototype.popScene = function() {
        if ($gameSystem.isSRPGMode() == true && $gameTemp.activeEvent()) {
            $gameTemp.setSrpgActorEquipFlag(true);
        }
        SceneManager.pop();
    };

//====================================================================
// ●Scene_Load
//====================================================================
    var _SRPG_Scene_Load_onLoadSuccess = Scene_Load.prototype.onLoadSuccess;
    Scene_Load.prototype.onLoadSuccess = function() {
        _SRPG_Scene_Load_onLoadSuccess.call(this);
        if ($gameSystem.isSRPGMode() == true) {
            $gameTemp.setSrpgLoadFlag(true);
        }
    };

    var _SRPG_Scene_Load_reloadMapIfUpdated = Scene_Load.prototype.reloadMapIfUpdated;
    Scene_Load.prototype.reloadMapIfUpdated = function() {
        if ($gameSystem.isSRPGMode() == false) {
            _SRPG_Scene_Load_reloadMapIfUpdated.call(this);
        }
    };

//====================================================================
// ●BattleManager
//====================================================================
    //初期化
    var _SRPG_BattleManager_initMembers = BattleManager.initMembers;
    BattleManager.initMembers = function() {
        _SRPG_BattleManager_initMembers.call(this);
        this._srpgBattleStatusWindowLeft = null;
        this._srpgBattleStatusWindowRight = null;
        this._srpgBattleResultWindow = null;
    };

    //ステータスウィンドウのセット
    BattleManager.setSrpgBattleStatusWindow = function(left, right) {
        this._srpgBattleStatusWindowLeft = left;
        this._srpgBattleStatusWindowRight = right;
    };

    //ステータスウィンドウのリフレッシュ
    var _SRPG_BattleManager_refreshStatus = BattleManager.refreshStatus;
    BattleManager.refreshStatus = function() {
        if ($gameSystem.isSRPGMode() == true) {
            this._srpgBattleStatusWindowLeft.refresh();
            this._srpgBattleStatusWindowRight.refresh();
        } else {
            _SRPG_BattleManager_refreshStatus.call(this);
        }
    };

    //リザルトウィンドウのセット
    BattleManager.setSrpgBattleResultWindow = function(window) {
        this._srpgBattleResultWindow = window;
    };

    //戦闘開始
    var _SRPG_BattleManager_startBattle = BattleManager.startBattle;
    BattleManager.startBattle = function() {
        if ($gameSystem.isSRPGMode() == true) {
            this._phase = 'start';
            $gameSystem.onBattleStart();
            $gameParty.onBattleStart();
            $gameTroop.onBattleStart();
        } else {
            _SRPG_BattleManager_startBattle.call(this);
        }
    };

    //入力開始
    var _SRPG_BattleManager_startInput = BattleManager.startInput;
    BattleManager.startInput = function() {
        if ($gameSystem.isSRPGMode() == true) {
            //this.clearActor();
            this.startTurn();
        } else {
            _SRPG_BattleManager_startInput.call(this);
        }
    };

    //入力開始
    var _SRPG_BattleManager_invokeAction = BattleManager.invokeAction;
    BattleManager.invokeAction = function(subject, target) {
        if ($gameSystem.isSRPGMode() == true) {
            this._logWindow.push('pushBaseLine');
            if (Math.random() < this._action.itemCnt(target)) {
                var attackSkill = $dataSkills[target.attackSkillId()];
                if (target.canUse(attackSkill) == true) {
                    this.invokeCounterAttack(subject, target);
                } else {
                    this.invokeNormalAction(subject, target);
                }
            } else if (Math.random() < this._action.itemMrf(target)) {
                this.invokeMagicReflection(subject, target);
            } else {
                this.invokeNormalAction(subject, target);
            }
            subject.setLastTarget(target);
            this._logWindow.push('popBaseLine');
            this.refreshStatus();
        } else {
            _SRPG_BattleManager_invokeAction.call(this, subject, target);
        }
    };

    //戦闘終了のチェック（SRPG戦闘では無効化する）
    var _SRPG_BattleManager_checkBattleEnd = BattleManager.checkBattleEnd;
    BattleManager.checkBattleEnd = function() {
        if ($gameSystem.isSRPGMode() == false) {
            return _SRPG_BattleManager_checkBattleEnd.call(this);
        } else {
            return false;
        }
    };

    var _SRPG_BattleManager_checkAbort = BattleManager.checkAbort;
    BattleManager.checkAbort = function() {
        if ($gameSystem.isSRPGMode() == false) {
            return _SRPG_BattleManager_checkAbort.call(this);
        } else {
            if (this.isAborting()) {
                this.processAbort();
                return true;
            }
            return false;
        }
    };

    var _SRPG_BattleManager_checkAbort2 = BattleManager.checkAbort2;
    BattleManager.checkAbort2 = function() {
        if ($gameSystem.isSRPGMode() == false) {
            return _SRPG_BattleManager_checkAbort2.call(this);
        } else {
            if (this.isAborting()) {
                SoundManager.playEscape();
                this._escaped = true;
                this.processAbort();
            }
            return false;
        }
    };

    //ターン終了時の処理
    var _SRPG_BattleManager_endTurn = BattleManager.endTurn;
    BattleManager.endTurn = function() {
        if ($gameSystem.isSRPGMode() == true) {
            this._phase = 'battleEnd';
            this._preemptive = false;
            this._surprise = false;
            this.refreshStatus();
            if (this._phase) {
                if ($gameParty.battleMembers()[0] && $gameParty.battleMembers()[0].isAlive()) {
                    this.processSrpgVictory();
                } else {
                    this.endBattle(3);
                }
            }
        } else {
            _SRPG_BattleManager_endTurn.call(this);
        }
    };

    //戦闘終了の処理（勝利）
    BattleManager.processSrpgVictory = function() {
        if ($gameTroop.members()[0] && $gameTroop.isAllDead()) {
            $gameParty.performVictory();
        }
        this.makeRewards();
        this._srpgBattleResultWindow.setRewards(this._rewards);
        var se = {};
        se.name = _rewardSe;
        se.pan = 0;
        se.pitch = 100;
        se.volume = 90;
        AudioManager.playSe(se);
        this._srpgBattleResultWindow.open();
        this.gainRewards();
    };

    //経験値の入手
    var _SRPG_BattleManager_gainExp = BattleManager.gainExp;
    BattleManager.gainExp = function() {
        if ($gameSystem.isSRPGMode() == true) {
            var exp = this._rewards.exp;
            $gameParty.battleMembers()[0].gainExp(exp);
        } else {
            _SRPG_BattleManager_gainExp.call(this);
        }
    };

    //戦闘終了の処理（共通）
    var _SRPG_BattleManager_endBattle = BattleManager.endBattle;
    BattleManager.endBattle = function(result) {
        _SRPG_BattleManager_endBattle.call(this, result);
        if (this._srpgBattleResultWindow) {
            this._srpgBattleResultWindow.close();
        }
        this.replayBgmAndBgs();
        $gameSystem.setSubBattlePhase('after_battle');
    };

    //戦闘終了処理のアップデート
    var _SRPG_BattleManager_updateBattleEnd = BattleManager.updateBattleEnd;
    BattleManager.updateBattleEnd = function() {
        if ($gameSystem.isSRPGMode() == true) {
            if ($gameSystem.isSubBattlePhase() === 'after_battle') {
                SceneManager.pop();
                this._phase = null;
            } else if (this._srpgBattleResultWindow.isChangeExp() == false &&
                (Input.isPressed('ok') || TouchInput.isPressed())) {
                this.endBattle(3);
            }
        } else {
            _SRPG_BattleManager_updateBattleEnd.call(this);
        }
    };

//====================================================================
// ●Scene_Battle
//====================================================================
    // フェード速度を返す
    Scene_Battle.prototype.fadeSpeed = function() {
        if ($gameSystem.isSRPGMode() == true && _srpgBattleQuickLaunch == 'true') {
           return 12;
        } else {
           return Scene_Base.prototype.fadeSpeed.call(this);
        }
    };

    // ウィンドウの作成
    var _SRPG_Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        _SRPG_Scene_Battle_createAllWindows.call(this);
        this.createSprgBattleStatusWindow();
        if ($gameParty.battleMembers()[0] && $gameParty.battleMembers()[0].isAlive()) {
            this.createSrpgBattleResultWindow();
        }
    };

    // SRPG戦闘用のウィンドウを作る
    Scene_Battle.prototype.createSprgBattleStatusWindow = function() {
        this._srpgBattleStatusWindowLeft = new Window_SrpgBattleStatus(0);
        this._srpgBattleStatusWindowRight = new Window_SrpgBattleStatus(1);
        this._srpgBattleStatusWindowLeft.openness = 0;
        this._srpgBattleStatusWindowRight.openness = 0;
        if ($gameParty.battleMembers()[0]) {
            this._srpgBattleStatusWindowRight.setBattler($gameParty.battleMembers()[0]);
            if ($gameParty.battleMembers()[1]) {
                this._srpgBattleStatusWindowLeft.setBattler($gameParty.battleMembers()[1]);
            }
        }
        if ($gameTroop.members()[0]) {
            this._srpgBattleStatusWindowLeft.setBattler($gameTroop.members()[0]);
            if ($gameTroop.members()[1]) {
                this._srpgBattleStatusWindowRight.setBattler($gameTroop.members()[1]);
            }
        }
        this.addWindow(this._srpgBattleStatusWindowLeft);
        this.addWindow(this._srpgBattleStatusWindowRight);
        BattleManager.setSrpgBattleStatusWindow(this._srpgBattleStatusWindowLeft, this._srpgBattleStatusWindowRight);
    };

    // SRPG戦闘用のウィンドウを作る
    Scene_Battle.prototype.createSrpgBattleResultWindow = function() {
        this._srpgBattleResultWindow = new Window_SrpgBattleResult($gameParty.battleMembers()[0]);
        this._srpgBattleResultWindow.openness = 0;
        this.addWindow(this._srpgBattleResultWindow);
        BattleManager.setSrpgBattleResultWindow(this._srpgBattleResultWindow);
    };

    //ステータスウィンドウのアップデート
    var _SRPG_Scene_Battle_updateStatusWindow = Scene_Battle.prototype.updateStatusWindow;
    Scene_Battle.prototype.updateStatusWindow = function() {
        if ($gameSystem.isSRPGMode() == true) {
            this._statusWindow.close();
            if ($gameMessage.isBusy()) {
                this._srpgBattleStatusWindowLeft.close();
                this._srpgBattleStatusWindowRight.close();
                this._partyCommandWindow.close();
                this._actorCommandWindow.close();
            } else if (this.isActive() && !this._messageWindow.isClosing()) {
                this._srpgBattleStatusWindowLeft.open();
                this._srpgBattleStatusWindowRight.open();
            }
        } else {
            _SRPG_Scene_Battle_updateStatusWindow.call(this);
        }
    };

    //ステータスウィンドウのリフレッシュ
    var _SRPG_Scene_Battle_refreshStatus = Scene_Battle.prototype.refreshStatus;
    Scene_Battle.prototype.refreshStatus = function() {
        if ($gameSystem.isSRPGMode() == true) {
            this._srpgBattleStatusWindowLeft.refresh();
            this._srpgBattleStatusWindowRight.refresh();
        } else {
            _SRPG_Scene_Battle_refreshStatus.call(this);
        }
    };

//====================================================================
// Map Battle System
//====================================================================

//====================================================================
// utility functions for finding unit events
//====================================================================

	// get the event for a general battler
	Game_BattlerBase.prototype.event = function() {
		var currentBattler = this;
		var eventId = 0;
		$gameSystem._EventToUnit.forEach(function (battleArray, index) {
			if (battleArray && battleArray[1] === currentBattler) eventId = index;
		});
		return $gameMap.event(eventId);
	};

	// get the event for an actor specifically
	Game_Actor.prototype.event = function() {
		var currentActor = this.actorId();
		var eventId = 0;
		$gameSystem._EventToUnit.forEach(function (battleArray, index) {
			if (battleArray && battleArray[1] === currentActor) eventId = index;
		});
		return $gameMap.event(eventId);
	};

//====================================================================
// process attacks directly on the map scene
//====================================================================

	// force a specific style of battle for one exchange
	Game_System.prototype.forceSRPGBattleMode = function(type) {
		this._battleMode = type;
	};
	Game_System.prototype.clearSRPGBattleMode = function() {
		this._battleMode = null;
	};

	// control whether to use map battle or not
	Game_System.prototype.useMapBattle = function() {
		// forced mode
		if (this._battleMode === 'map') return true;
		else if (this._battleMode === 'normal') return false;
		// system defaults
		else if (_useMapBattle == 3) return true;
		else if (_useMapBattle == 2 && ConfigManager['mapBattle'] == true) return true;
		else if (_useMapBattle == 0) return false;
		else return (_mapBattleSwitch > 0 && $gameSwitches.value(_mapBattleSwitch));
	};

	// set up the map attacks
	var _srpgBattleStart_MB = Scene_Map.prototype.srpgBattleStart;
	Scene_Map.prototype.srpgBattleStart = function(userArray, targetArray) {
		// get the data
		var user = userArray[1];
		var target = targetArray[1];
		var action = user.action(0);
		var reaction = null;

		// check if we're using map battle on this skill
		if (action && action.item()) {
			var mapBattleTag = action.item().meta.mapBattle;
			if (mapBattleTag == 'true') $gameSystem.forceSRPGBattleMode('map');
			else if (mapBattleTag == 'false') $gameSystem.forceSRPGBattleMode('normal');
		}
		if (!$gameSystem.useMapBattle()) {
			_srpgBattleStart_MB.call(this, userArray, targetArray);
			return;
		}

		// prepare action timing
		user.setActionTiming(0);
		if (user != target) target.setActionTiming(1);

		// pre-skill setup
		$gameSystem.clearSrpgStatusWindowNeedRefresh();
		$gameSystem.clearSrpgBattleWindowNeedRefresh();

		// make free actions work
		var addActionTimes = Number(action.item().meta.addActionTimes || 0);
		if (addActionTimes > 0) {
			user.SRPGActionTimesAdd(addActionTimes);
		}

		this.preBattleSetDirection();
		this.eventBeforeBattle();

		// set up the troop and the battle party
		$gameTroop.clearSrpgBattleEnemys();
		$gameTroop.clear();
		$gameParty.clearSrpgBattleActors();
		if (userArray[0] === 'enemy') $gameTroop.pushSrpgBattleEnemys(user);
		else $gameParty.pushSrpgBattleActors(user);
		if (targetArray[0] === 'enemy') $gameTroop.pushSrpgBattleEnemys(target);
		else $gameParty.pushSrpgBattleActors(target);
		BattleManager.setup(_srpgTroopID, false, true);
		action.setSubject(user);

		// queue the action
		this.srpgAddMapSkill(action, user, target);

		// queue up counterattack
		if (userArray[0] !== targetArray[0] && target.canMove() && !action.item().meta.srpgUncounterable) {
			target.srpgMakeNewActions();
			reaction = target.action(0);
			reaction.setSubject(target);
			reaction.setAttack();
			var actFirst = (reaction.speed() > action.speed());
			if (_srpgUseAgiAttackPlus == 'true') actFirst = false;
			this.srpgAddMapSkill(reaction, target, user, actFirst);
		}

                // agi attack plus
                if (_srpgUseAgiAttackPlus == 'true') {
                    if (user.agi >= target.agi) {
                        var firstBattler = user;
                        var secondBattler = target;
                    } else {
                        var firstBattler = target;
                        var secondBattler = user;
                    }
                    if (!firstBattler.currentAction() || !firstBattler.currentAction().item()) {
                        return;
                    }
                    if (firstBattler.currentAction().isForOpponent() &&
                        !firstBattler.currentAction().item().meta.doubleAction) {
                        var dif = firstBattler.agi - secondBattler.agi;
                        var difMax = secondBattler.agi * _srpgAgilityAffectsRatio - secondBattler.agi;
                        if (difMax == 0) {
                            agilityRate = 100;
                        } else {
                            agilityRate = dif / difMax * 100;
                        }
                        if (agilityRate > Math.randomInt(100)) {
                            var agiAction = firstBattler.action(0);
                            this.srpgAddMapSkill(agiAction, firstBattler, secondBattler)
                        }
                    }
                }
	};

	// work through the queue of attacks
	var _SRPG_MB_SceneMap_update = Scene_Map.prototype.update;
	Scene_Map.prototype.update = function() {
		_SRPG_MB_SceneMap_update.call(this);

		// there are definitely no map skills in play
		if (!$gameSystem.isSRPGMode() || $gameSystem.isSubBattlePhase() !== 'invoke_action' ||
		!$gameSystem.useMapBattle()) {
			return;
		}

		// update map skills
		if (!this.waitingForSkill() && !this._srpgBattleResultWindow.isChangeExp()) {
			// process skills
			while (this.srpgHasMapSkills() && !this.waitingForSkill()) {
				this.srpgUpdateMapSkill();
			}

			// process the battle results window
			if (!this.srpgHasMapSkills() && !this._srpgBattleResultWindow.isOpen() &&
			!this._srpgBattleResultWindow.isOpening() && !this.isBusy()) {
				if ($gameParty.battleMembers()[0] && $gameParty.battleMembers()[0].isAlive()) $gameParty.battleMembers()[0].onAllActionsEnd();
				if ($gameParty.battleMembers()[1] && $gameParty.battleMembers()[1].isAlive()) $gameParty.battleMembers()[1].onAllActionsEnd();
				if ($gameTroop.members()[0] && $gameTroop.members()[0].isAlive()) $gameTroop.members()[0].onAllActionsEnd();
				if ($gameTroop.members()[1] && $gameTroop.members()[1].isAlive()) $gameTroop.members()[1].onAllActionsEnd();
				var showResults = this.processSrpgVictory();
				if (!showResults) $gameSystem.setSubBattlePhase('after_battle');
			} else if (this._srpgBattleResultWindow.isOpen() &&
			(Input.isPressed('ok') || Input.isPressed('cancel') ||
			TouchInput.isPressed() || TouchInput.isCancelled())) {
				this._srpgBattleResultWindow.close();
				$gameSystem.setSubBattlePhase('after_battle');
			}
		} else {
			// time-based waiting
			this.updateSkillWait();
		}
	};

	// reset battle mode between skills
	var _srpgAfterAction = Scene_Map.prototype.srpgAfterAction;
	Scene_Map.prototype.srpgAfterAction = function() {
		$gameSystem.clearSRPGBattleMode();
		_srpgAfterAction.call(this);
	};

	// time-based skill wait!
	Scene_Map.prototype.setSkillWait = function(time) {
		this._skillWait = time;
	};
	Scene_Map.prototype.updateSkillWait = function() {
		if (this._skillWait > 0) this._skillWait--;
	};
	Scene_Map.prototype.resetSkillWait = function() {
		this._skillWait = undefined;
	};
	Scene_Map.prototype.skillWait = function() {
		return this._skillWait || 0;
	};
	Scene_Map.prototype.skillAnimWait = function() {
		return (this._skillWait == undefined);
	};

	// check if we're still waiting for a skill to finish
	Scene_Map.prototype.waitingForSkill = function() {
		if ($gameTemp.isCommonEventReserved()) return true;

		if ($gamePlayer.isAnimationPlaying() || !$gamePlayer.isStopping() ||
		$gameTemp.isAutoMoveDestinationValid()) return true;

		if (this.skillAnimWait()) {
			var active = $gameTemp.activeEvent();
			if (active.isAnimationPlaying() || !active.isStopping()) return true;

			var target = $gameTemp.targetEvent();
			if (!target) return false;
			if (target.isAnimationPlaying() || !target.isStopping()) return true;
		} else if (this.skillWait() > 0) return true;

		return false;
	};

	// no moving during a skill!
	var _Game_Player_MB_canMove = Game_Player.prototype.canMove;
	Game_Player.prototype.canMove = function() {
		if ($gameSystem.isSRPGMode() && $gameSystem.isSubBattlePhase() === 'invoke_action') {
			return false;
		}
		return _Game_Player_MB_canMove.call(this);
	};

	// no pausing, either!
	var _updateCallMenu_MB = Scene_Map.prototype.updateCallMenu;
	Scene_Map.prototype.updateCallMenu = function() {
		if ($gameSystem.isSRPGMode() && $gameSystem.isSubBattlePhase() === 'invoke_action') {
			this.menuCalling = false;
			return;
		}
		_updateCallMenu_MB.call(this);
	};

//====================================================================
// queue of skills being executed on the map
//====================================================================

	// queue up a skill for the on-map battle
	Scene_Map.prototype.srpgAddMapSkill = function(action, user, target, addToFront) {
		this._srpgSkillList = this._srpgSkillList || [];
                if (_AAPwithYEP_BattleEngineCore == 'false') {
			var data = {
				action: action,
				user: user,
				target: target,
				phase: 'start',
				count: action.numRepeats(),
			};
                } else {
			var data = {
				action: action,
				user: user,
				target: target,
				phase: 'start',
				count: action.numRepeats() + action.item()._srpgRepeats,
			};
                }
		if (addToFront) this._srpgSkillList.unshift(data);
		else this._srpgSkillList.push(data);
	};

	// build the physical counter attack
	Scene_Map.prototype.srpgAddCounterAttack = function(user, target) {
		target.srpgMakeNewActions();
		target.action(0).setSubject(target);
		target.action(0).setAttack();
		this.srpgAddMapSkill(target.action(0), target, user, true);
		this._srpgSkillList[0].counter = true;
	};

	// check how many skills are left on the queue
	Scene_Map.prototype.srpgHasMapSkills = function() {
		this._srpgSkillList = this._srpgSkillList || [];
		return this._srpgSkillList.length;
	};

	// clear all enqueued skills
	Scene_Map.prototype.srpgClearMapSkills = function() {
		this._srpgSkillList = this._srpgSkillList || [];
		this._srpgSkillList.clear();
	};

	// get the next skill off the queue and invoke it
	Scene_Map.prototype.srpgUpdateMapSkill = function() {
		this._srpgSkillList = this._srpgSkillList || [];
		var data = this._srpgSkillList.shift();
		if (!data) return false;
		return this.srpgInvokeMapSkill(data);
	};

	// invoke skill effects
	Scene_Map.prototype.srpgInvokeMapSkill = function(data) {
		var action = data.action;
		var user = data.user;
		var target = data.target;

		switch (data.phase) {
			// skill cost and casting animations
			case 'start':
				if (!user.canMove() || !user.canUse(action.item()) || !target.isAlive()) {
					data.phase = 'cancel';
					this._srpgSkillList.unshift(data);
					break;
				}
				user.useItem(action.item());
				if (!$gameTemp.isFirstAction || $gameTemp.isFirstAction()) {
					var castAnim = false;
					// cast animation, is a skill, isn't an attack or guard
					if (action.item().castAnimation && action.isSkill() && !action.isAttack() && !action.isGuard()) {
						user.event().requestAnimation(action.item().castAnimation);
						castAnim = true;
					}
					// target animation
					if (action.item().meta.targetAnimation) {
						$gamePlayer.requestAnimation(Number(action.item().meta.targetAnimation));
						castAnim = true;
					}
					// directional target animation
					if (action.item().meta.directionalAnimation) {
						var dir = user.event().direction()/2 - 1;
						$gamePlayer.requestAnimation(dir + Number(action.item().meta.directionalAnimation));
						castAnim = true;
					}
				}
				// check for reflection
				if (user != target && Math.random() < action.itemMrf(target)) {
					data.phase = 'reflect';
				} else {
					data.phase = 'animation';
				}
				this._srpgSkillList.unshift(data);
				break;

			// reflected magic
			case 'reflect':
				target.performReflection();
				if (target.reflectAnimationId) {
					target.event().requestAnimation(target.reflectAnimationId());
				}
				data.target = user;
				data.phase = 'animation';
				this._srpgSkillList.unshift(data);
				break;

			// show skill animation
			case 'animation':
				var animation = action.item().animationId;
				if (animation < 0) animation = (user.isActor() ? user.attackAnimationId1() : user.attackAnimationId());
				target.event().requestAnimation(animation);
				data.phase = 'effect';
				this._srpgSkillList.unshift(data);
				// time-based delay
				var delay = _animDelay;
				if (action.item().meta.animationDelay) delay = Number(action.item().meta.animationDelay);
				if (delay >= 0) this.setSkillWait(delay);
				break;

			// apply skill effects
			case 'effect':
				// skill effect repeats
				data.count--;
				if (data.count > 0) {
					data.phase = 'animation';
				} else {
					data.phase = 'global';
				}
				this._srpgSkillList.unshift(data);
				this.resetSkillWait();

				// apply effects or trigger a counter
				if (!data.counter && user != target && Math.random() < action.itemCnt(target)) {
					var attackSkill = $dataSkills[target.attackSkillId()];
					if (target.canUse(attackSkill) == true) {
						target.performCounter();
						this.srpgAddCounterAttack(user, target);
					} else {
						action.apply(target);
					}
				} else {
					action.apply(target);
				}
				break;

			// run the common events and such
			case 'global':
				action.applyGlobal();
				data.phase = 'end';
				this._srpgSkillList.unshift(data);
				break;

			// clean up at the end
			case 'cancel':
			case 'end':
				user.setLastTarget(target);
				user.removeCurrentAction();
				this._waitCount = 30;
				break;
		}

		// Show the results
		user.srpgShowResults();
		target.srpgShowResults();
		return true;
	};

	// show the results of the action
	Game_BattlerBase.prototype.srpgShowResults = function() {
		var result = this.result();
		// ways to hit
		if (result.isHit()) {
			if (result.hpDamage > 0 && !result.drain) this.performDamage();
			if (result.hpDamage < 0 || result.mpDamage < 0 || result.tpDamage < 0) this.performRecovery();
			var target = this;
			result.addedStateObjects().forEach(function(state) {
				if (state.id === target.deathStateId()) target.performCollapse();
			});
		}
		// ways to miss
		else {
			if (result.missed) this.performMiss();
			if (result.evaded && result.physical) this.performEvasion();
			if (result.evaded && !result.physical) this.performMagicEvasion();
		}
		// show pop-ups
		this.startDamagePopup();
	};

//====================================================================
// Handle battle rewards
//====================================================================

	// add "rewards" object to the map scene
	var _scene_map_initialize_MB = Scene_Map.prototype.initialize;
	Scene_Map.prototype.initialize = function() {
		_scene_map_initialize_MB.call(this);
		this._rewards = {};
	};

	// properly initialize, even without a battler
	Window_SrpgBattleResult.prototype.initialize = function(battler) {
		var width = this.windowWidth();
		var height = this.windowHeight();
		var x = (Graphics.boxWidth - width) / 2;
		var y = Graphics.boxHeight / 2 - height;
		this.setBattler(battler);
		this._rewards = null;
		this._changeExp = 0;
		Window_Base.prototype.initialize.call(this, x, y, width, height);
	};

	// update the battler between showings of the window
	Window_SrpgBattleResult.prototype.setBattler = function(battler) {
		this._battler = battler;
		if (battler) {
			this._reserveExp = this._battler.currentExp();
			this._level = this._battler.level;
		} else {
			this._reserveExp = 0;
			this._level = 0;
		}
	};

	// put a results window in the scene
	var _scene_map_createAllWindows_MB = Scene_Map.prototype.createAllWindows;
	Scene_Map.prototype.createAllWindows = function() {
		_scene_map_createAllWindows_MB.call(this);
		this.createSrpgBattleResultWindow();
	};
	Scene_Map.prototype.createSrpgBattleResultWindow = function() {
		this._srpgBattleResultWindow = new Window_SrpgBattleResult($gameParty.battleMembers()[0]);
		this._srpgBattleResultWindow.openness = 0;
		this.addWindow(this._srpgBattleResultWindow);
	};

	// use all the existing code for rewards, so it can inherit plugin modifications
	Scene_Map.prototype.makeRewards = BattleManager.makeRewards;
	Scene_Map.prototype.gainRewards = BattleManager.gainRewards;
	Scene_Map.prototype.gainExp = BattleManager.gainExp;
	Scene_Map.prototype.gainGold = BattleManager.gainGold;
	Scene_Map.prototype.gainDropItems = BattleManager.gainDropItems;

	// process victory
	Scene_Map.prototype.processSrpgVictory = function() {
		if ($gameParty.battleMembers()[0] && $gameParty.battleMembers()[0].isAlive()) {
			this.makeRewards();
			if (this._rewards.exp > 0 || this._rewards.gold > 0 || this._rewards.items.length > 0) {
				this._srpgBattleResultWindow.setBattler($gameParty.battleMembers()[0]);
				this._srpgBattleResultWindow.setRewards(this._rewards);
				var se = {};
				se.name = _rewardSe;
				se.pan = 0;
				se.pitch = 100;
				se.volume = 90;
				AudioManager.playSe(se);
				this._srpgBattleResultWindow.open();
				this.gainRewards();
				return true;
			}
			return false;
		}
	};

//====================================================================
// show popups for tile and status damage
//====================================================================

	// show pop-up for regeneration
	var _battler_regenerateAll_MB = Game_Battler.prototype.regenerateAll;
	Game_Battler.prototype.regenerateAll = function() {
		_battler_regenerateAll_MB.call(this);
		if ($gameSystem.isSRPGMode()) {
			this._result.used = true;
			this.srpgShowResults();
		}
	};

	// show pop-up for floor damage
	var _srpgExecuteFloorDamage_MB = Game_Battler.prototype.srpgExecuteFloorDamage;
	Game_Battler.prototype.srpgExecuteFloorDamage = function() {
		_srpgExecuteFloorDamage_MB.call(this);
		if (this._result.hpDamage != 0) {
			this._result.used = true;
			this.srpgShowResults();
		}
	};

	// suppress the screen flash from damage in SRPG mode
	var _startFlashForDamage_MB = Game_Screen.prototype.startFlashForDamage;
	Game_Screen.prototype.startFlashForDamage = function() {
		if (!$gameSystem.isSRPGMode()) _startFlashForDamage_MB.call(this);
	};

//====================================================================
// on-map damage pop-ups
//====================================================================

	// initialize the damage popups
	var _sprite_character_initMembers_MB = Sprite_Character.prototype.initMembers;
	Sprite_Character.prototype.initMembers = function() {
		_sprite_character_initMembers_MB.call(this);
		this._damages = [];
	};

	// update the damage popups
	var _sprite_character_update_MB = Sprite_Character.prototype.update;
	Sprite_Character.prototype.update = function (){
		_sprite_character_update_MB.call(this);
		if (this._character.isEvent()) {
			this.updateDamagePopup_MB();
		}
	};

	// update the damage pop-ups each frame
	Sprite_Character.prototype.updateDamagePopup_MB = function() {
		this.setupDamagePopup_MB();
		if (this._damages.length > 0) {
			for (var i = 0; i < this._damages.length; i++) {
				this._damages[i].update();
			}
			if (!this._damages[0].isPlaying()) {
				this.parent.removeChild(this._damages[0]);
				this._damages.shift();
			}
		}
	};

	// create the damage pop-up
	Sprite_Character.prototype.setupDamagePopup_MB = function() {
		var array = $gameSystem.EventToUnit(this._character.eventId());
		if ($gameSystem.isSRPGMode() && array && array[1]) {
			var battler = array[1];
			if (battler.isDamagePopupRequested()) {
				var sprite = new Sprite_Damage();
				sprite.x = this.x;
				sprite.y = this.y;
				sprite.z = 9;
				sprite.setup(battler);
				this._damages.push(sprite);
				this.parent.addChild(sprite);;
			}
			battler.clearDamagePopup();
			battler.clearResult();
		}
	};

//====================================================================
// compatability overrides
//====================================================================

	// track intended repeats from before BattleEngineCore
	if (DataManager.addActionEffects) {
		var _addActionEffects = DataManager.addActionEffects;
		DataManager.addActionEffects = function(obj, array) {
			var initialRepeats = obj.repeats;
			_addActionEffects.call(this, obj, array);
			obj._srpgRepeats = initialRepeats - obj.repeats;
		};
	}

//====================================================================
// Config
//====================================================================
ConfigManager.mapBattle = false;

var _MB_ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
    var config = _MB_ConfigManager_makeData.call(this);
    config.mapBattle = this.mapBattle;
    return config;
};

var _MB_ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
    _MB_ConfigManager_applyData.call(this, config);
    this.mapBattle = this.readFlag(config, 'mapBattle');
};

var _MB_Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function() {
    _MB_Window_Options_addGeneralOptions.call(this);
    if (_useMapBattle == 2) this.addCommand('マップバトル', 'mapBattle');
};

//====================================================================
// ●SRPG_AgiAttackPlus
//====================================================================
//====================================================================
// ●Game_Action
//====================================================================
    var _SRPG_AAP_Game_Action_speed = Game_Action.prototype.speed;
    Game_Action.prototype.speed = function() {
        if ($gameSystem.isSRPGMode() == true && _srpgUseAgiAttackPlus == 'true') {
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
        if (!_srpgUseAgiAttackPlus) return;
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

//====================================================================
// ●SRPG_YEP_BattleEngineCore
//====================================================================
//アクタースプライトの基準位置
var _SRPG_YEP_Sprite_Actor_setActorHome = Sprite_Actor.prototype.setActorHome;
Sprite_Actor.prototype.setActorHome = function(index) {
	if (_AAPwithYEP_BattleEngineCore == 'true') {
	    if ($gameSystem.isSRPGMode() == true) {
	        this.setHome(Graphics.width - 216 - index * 240, Graphics.height / 2 + 48);
	        this.moveToStartPosition();
	    } else {
	        _SRPG_YEP_Sprite_Actor_setActorHome.call(this, index);
	    }
	} else {
	    _SRPG_YEP_Sprite_Actor_setActorHome.call(this, index);
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

var _SRPG_YEP_BattleManager_invokeAction = BattleManager.invokeAction;
BattleManager.invokeAction = function(subject, target) {
  if (_AAPwithYEP_BattleEngineCore == 'true') {
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
  } else {
	_SRPG_YEP_BattleManager_invokeAction.call(this, subject, target);
  }
};

})();
