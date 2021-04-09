class Battle {
  constructor(attacker, defender) {
    this.attacker = attacker;
    this.defender = defender;

    this.attackerMeleeCount = this.attacker.get().army.melee.length;
    this.attackerRangedCount = this.attacker.get().army.ranged.length;
    this.defenderMeleeCount = this.defender.get().army.melee.length;
    this.defenderRangedCount = this.defender.get().army.ranged.length;
    this.attackerMeleeDeadCount = 0;
    this.attackerRangedDeadCount = 0;
    this.defenderMeleeDeadCount = 0;
    this.defenderRangedDeadCount = 0;
  }

  debugArmorDamage = (message, armor, damage) => {
    let currentArmor = armor - damage;
    console.log(
      '***' + message + damage + '(' + armor + ' => ' + currentArmor + ')'
    );
  };

  prepare = (defenderBuff, attackerBuff) => {
    // set defender armor
    for (var i = 0; i < this.defender.get().army.melee.length; ++i) {
      this.defender.get().army.melee[i].armor = Math.floor(
        this.defender.get().army.melee[i].armor * defenderBuff
      );
    }

    for (var i = 0; i < this.defender.get().army.ranged.length; ++i) {
      this.defender.get().army.ranged[i].armor = Math.floor(
        this.defender.get().army.ranged[i].armor * defenderBuff
      );
    }

    // set attacker str
    for (var i = 0; i < this.attacker.get().army.melee.length; ++i) {
      this.attacker.get().army.melee[i].str = Math.floor(
        this.attacker.get().army.melee[i].str * attackerBuff
      );
    }

    for (var i = 0; i < this.attacker.get().army.ranged.length; ++i) {
      this.attacker.get().army.ranged[i].str = Math.floor(
        this.attacker.get().army.ranged[i].str * attackerBuff
      );
    }

    console.log('Battle is starting...', '');
    console.log(
      'Attacker',
      JSON.parse(JSON.stringify(this.attacker.get().army))
    );
    console.log(
      'Defender',
      JSON.parse(JSON.stringify(this.defender.get().army))
    );
    console.log('Begin Fight!', '');
  };

  fight = () => {
    var attackerMeleeArmy = this.attacker.get().army.melee;
    var attackerRangedArmy = this.attacker.get().army.ranged;
    var defenderMeleeArmy = this.defender.get().army.melee;
    var defenderRangedArmy = this.defender.get().army.ranged;

    // Attacker Melee
    for (var i = 0; i < attackerMeleeArmy.length; ++i) {
      let target;
      if (defenderMeleeArmy.length > 0) {
        let index = Math.floor(Math.random() * defenderMeleeArmy.length);
        target = defenderMeleeArmy[index];

        if (target.armor > 0) {
          this.debugArmorDamage(
            'Attacker melee hit to defender melee armor: ',
            target.armor,
            attackerMeleeArmy[i].str
          );
          let newArmor = Math.floor(target.armor - attackerMeleeArmy[i].str);
          target.armor = newArmor > 0 ? newArmor : 0;
        } else {
          target.hp -= attackerMeleeArmy[i].str;
          console.log(
            'Attacker melee hit to defender melee hp: ' +
              attackerMeleeArmy[i].str
          );
        }

        if (target.hp <= 0) {
          defenderMeleeArmy.splice(index, 1);
          this.defenderMeleeDeadCount++;
          this.defenderMeleeCount--;
          console.log(
            this.attacker.get().id + ' Killed 1 Melee Person by Attacker Melee.'
          );
        }

        if (defenderRangedArmy.length > 0) {
          let rangedIndex = Math.floor(
            Math.random() * defenderRangedArmy.length
          );
          let ranged = defenderRangedArmy[rangedIndex];

          if (attackerMeleeArmy[i].armor > 0) {
            this.debugArmorDamage(
              'Defender ranged hit to attacker melee armor: ',
              attackerMeleeArmy[i].armor,
              ranged.str
            );
            let newArmor = Math.floor(attackerMeleeArmy[i].armor - ranged.str);
            attackerMeleeArmy[i].armor = newArmor > 0 ? newArmor : 0;
          } else {
            attackerMeleeArmy[i].hp -= ranged.str;
            console.log(
              'Defender ranged hit to attacker melee hp: ' + ranged.str
            );
          }

          if (attackerMeleeArmy[i].hp <= 0) {
            attackerMeleeArmy.splice(i, 1);
            this.attackerMeleeDeadCount++;
            this.attackerMeleeCount--;
            console.log(
              this.attacker.get().id +
                ' Killed 1 Melee Person by Defender Ranged'
            );
          }
        }
      } else {
        let index = Math.floor(Math.random() * defenderRangedArmy.length);
        let ranged = defenderRangedArmy[index];

        if (attackerMeleeArmy[i].armor > 0) {
          this.debugArmorDamage(
            'Defender ranged hit to attacker melee armor: ',
            attackerMeleeArmy[i].armor,
            ranged.str
          );
          let newArmor = Math.floor(attackerMeleeArmy[i].armor - ranged.str);
          attackerMeleeArmy[i].armor = newArmor > 0 ? newArmor : 0;
        } else {
          attackerMeleeArmy[i].hp -= ranged.str;
          console.log(
            'Defender ranged hit to attacker melee hp: ' +
              attackerMeleeArmy[i].str
          );
        }

        if (attackerMeleeArmy[i].hp <= 0) {
          attackerMeleeArmy.splice(i, 1);
          this.attackerMeleeDeadCount++;
          this.attackerMeleeCount--;
          console.log(
            this.attacker.get().id + ' Killed 1 Melee Person by Defender Ranged'
          );
        }
      }
    }

    // Attacker Ranged
    for (var i = 0; i < attackerRangedArmy.length; ++i) {
      let target;
      if (defenderMeleeArmy.length > 0) {
        let index = Math.floor(Math.random() * defenderMeleeArmy.length);
        target = defenderMeleeArmy[index];

        if (target.armor > 0) {
          this.debugArmorDamage(
            'Attacker ranged hit to defender ranged armor: ',
            target.armor,
            attackerRangedArmy[i].str
          );
          let newArmor = Math.floor(target.armor - attackerRangedArmy[i].str);
          target.armor = newArmor > 0 ? newArmor : 0;
        } else {
          target.hp -= attackerRangedArmy[i].str;
          console.log(
            'Attacker ranged hit to defender melee hp: ' +
              attackerRangedArmy[i].str
          );
        }

        if (target.hp <= 0) {
          defenderMeleeArmy.splice(index, 1);
          this.defenderMeleeDeadCount++;
          this.defenderMeleeCount--;
          console.log(
            this.attacker.get().id +
              ' Killed 1 Melee Person by Attacker Ranged.'
          );
        }

        if (defenderRangedArmy.length > 0) {
          let rangedIndex = Math.floor(
            Math.random() * defenderRangedArmy.length
          );
          let ranged = defenderRangedArmy[rangedIndex];

          if (attackerRangedArmy[i].armor > 0) {
            this.debugArmorDamage(
              'Defender ranged hit to attacker ranged armor: ',
              attackerRangedArmy[i].armor,
              ranged.str
            );
            let newArmor = Math.floor(attackerRangedArmy[i].armor - ranged.str);
            attackerRangedArmy[i].armor = newArmor > 0 ? newArmor : 0;
          } else {
            attackerRangedArmy[i].hp -= ranged.str;
            console.log(
              'Defender ranged hit to attacker ranged hp: ' +
                attackerRangedArmy[i].str
            );
          }

          if (attackerRangedArmy[i].hp <= 0) {
            attackerRangedArmy.splice(i, 1);
            this.attackerRangedDeadCount++;
            this.attackerRangedCount--;
            console.log(
              this.attacker.get().id +
                ' Killed 1 Ranged Person by Defender Ranged'
            );
          }
        }
      } else if (defenderRangedArmy.length > 0) {
        let index = Math.floor(Math.random() * defenderRangedArmy.length);
        let ranged = defenderRangedArmy[index];

        if (ranged.armor > 0) {
          this.debugArmorDamage(
            'Attacker ranged hit to defender ranged armor: ',
            ranged.armor,
            attackerRangedArmy[i].str
          );
          let newArmor = Math.floor(ranged.armor - attackerRangedArmy[i].str);
          ranged.armor = newArmor > 0 ? newArmor : 0;
        } else {
          ranged.hp -= attackerRangedArmy[i].str;
          console.log(
            'Attacker ranged hit to defender ranged hp: ' +
              attackerRangedArmy[i].str
          );
        }

        if (ranged.hp <= 0) {
          defenderRangedArmy.splice(index, 1);
          this.defenderRangedDeadCount++;
          this.defenderRangedCount--;
          console.log(
            this.attacker.get().id +
              ' Killed 1 Ranged Person by Attacker Ranged'
          );
        }

        if (defenderRangedArmy.length > 0) {
          let rangedIndex = Math.floor(
            Math.random() * defenderRangedArmy.length
          );
          let ranged = defenderRangedArmy[rangedIndex];

          if (attackerRangedArmy[i].armor > 0) {
            this.debugArmorDamage(
              'Defender ranged hit to attacker ranged armor: ',
              attackerRangedArmy[i].armor,
              ranged.str
            );
            let newArmor = Math.floor(ranged.armor - ranged.str);
            attackerRangedArmy[i].armor = newArmor > 0 ? newArmor : 0;
          } else {
            attackerRangedArmy[i].hp -= ranged.str;
            console.log(
              'Defender ranged hit to attacker ranged hp: ' +
                attackerRangedArmy[i].str
            );
          }

          if (attackerRangedArmy[i].hp <= 0) {
            attackerRangedArmy.splice(i, 1);
            this.attackerRangedDeadCount++;
            this.attackerRangedCount--;
            console.log(
              this.attacker.get().id +
                ' Killed 1 Ranged Person by Defender Ranged'
            );
          }
        }
      }
    }
  };

  check = () => {
    if (
      (this.attacker.get().army.melee.length > 0 ||
        this.attacker.get().army.ranged.length > 0) &&
      this.defender.get().army.melee.length === 0 &&
      this.defender.get().army.ranged.length === 0
    ) {
      return this.createCheckMessage(true, this.attacker);
    }

    if (
      (this.defender.get().army.melee.length > 0 ||
        this.defender.get().army.ranged.length > 0) &&
      this.attacker.get().army.melee.length === 0 &&
      this.attacker.get().army.ranged.length === 0
    ) {
      return this.createCheckMessage(true, this.defender);
    }

    return this.createCheckMessage(false, null);
  };

  createCheckMessage = (finish, winner) => {
    return {
      finish: finish,
      winner: winner,
      attackerDeadCounts: {
        melee: this.attackerMeleeDeadCount,
        ranged: this.attackerRangedDeadCount,
      },
      defenderDeadCounts: {
        melee: this.defenderMeleeDeadCount,
        ranged: this.defenderRangedDeadCount,
      },
      attackerArmy: {
        melee: this.attackerMeleeCount,
        ranged: this.attackerRangedCount,
      },
      defenderArmy: {
        melee: this.defenderMeleeCount,
        ranged: this.defenderRangedCount,
      },
    };
  };
}
