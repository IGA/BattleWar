const createPlayer = (id, name, meleeCount, rangedCount) => {
  var playerArmy = {
    melee: [],
    ranged: [],
  };

  for (var i = 0; i < meleeCount; ++i) {
    const unit = new Unit(Melee.str, Melee.armor, Melee.hp, Melee.type);
    playerArmy.melee.push(unit);
  }

  for (var i = 0; i < rangedCount; ++i) {
    const unit = new Unit(Ranged.str, Ranged.armor, Ranged.hp, Ranged.type);
    playerArmy.ranged.push(unit);
  }

  const player = new Player(id, name, playerArmy);

  return player;
};

document.addEventListener('DOMContentLoaded', function (e) {
  $('button').on('click', function () {
    $(this).prop('disabled', true);

    let player1Name = $('input[name="player1Name"]').val();
    let player1MeleeCount = $('input[name="player1melee"]').val();
    let player1RangedCount = $('input[name="player1ranged"]').val();

    let player2Name = $('input[name="player2Name"]').val();
    let player2MeleeCount = $('input[name="player2melee"]').val();
    let player2RangedCount = $('input[name="player2ranged"]').val();
    console.log(player1Name, player1MeleeCount, player1RangedCount);
    const player1 = createPlayer(
      1,
      player1Name,
      player1MeleeCount,
      player1RangedCount
    );
    const player2 = createPlayer(
      2,
      player2Name,
      player2MeleeCount,
      player2RangedCount
    );

    let battle = new Battle(player1, player2);
    battle.prepare(1, 1.2);

    let run = $('input[name="run"]').val();

    for (var i = 0; i < run; ++i) {
      battle.fight();
      var check = battle.check();
      var round = parseInt(i) + 1;
      if (check.finish) {
        Swal.fire({
          icon: 'success',
          title:
            'Winner: ' +
            check.winner.get().name +
            ' (' +
            (check.winner.get().id === 1 ? 'Attacker' : 'Defender') +
            ')',
          html:
            'At the end of <strong>' +
            round +
            '</strong> rounds, the attacker killed <strong>' +
            check.defenderDeadCounts.melee +
            '</strong> swordsmen and <strong>' +
            check.defenderDeadCounts.ranged +
            '</strong> archer soldiers. Also lost <strong>' +
            check.attackerDeadCounts.melee +
            '</strong> swordsmen and <strong>' +
            check.attackerDeadCounts.ranged +
            '</strong> archers.',
          showConfirmButton: false,
        });
        break;
      }
    }
    $(this).prop('disabled', false);
  });
});
