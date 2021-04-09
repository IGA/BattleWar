class Player {
  constructor(id, name, army) {
    this.id = id;
    this.name = name;
    this.army = army;
  }

  get() {
    return { id: this.id, name: this.name, army: this.army };
  }
}
