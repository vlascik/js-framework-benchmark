import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import {
  run, runLots, add, update, swapRows, deleteRow,
} from 'ember-temp/utils/benchmark-helpers';

export default class MyTable extends Component {
  @tracked
  id = 1;

  @tracked
  data = [];

  @tracked
  selected = undefined;

  getParentId(elem) {
    while (elem) {
      if (elem.tagName==="TR") {
        return +elem.dataset.data_id;
      }
      elem = elem.parentNode;
    }
    return undefined;
  }

  findIdx(id) {
    for (let i=0;i<this.data.length;i++){
      if (this.data[i].id === id) return i;
    }
    return undefined;
  }

  @action onClick(e) {
    if (e.target.matches('.glyphicon-remove')) {
      e.preventDefault();
      let id = +e.target.dataset?.data_id ?? this.getParentId(e.target);
      this.remove2(id);
    } else if (e.target.matches('.lbl')) {
      e.preventDefault();
      let id = +e.target.dataset?.data_id ?? this.getParentId(e.target);
      this.select2(id);
    }
  }

  @action create() {
    const result = run(this.id);

    this.id = result.id;
    this.data = result.data;
    this.selected  = undefined;
  }

  @action add() {
    const result = add(this.id, this.data);
    this.id = result.id;
    this.data = result.data;
  }

  @action update() {
    update(this.data);
  }

  @action runLots() {
    const result = runLots(this.id);

    this.data = result.data;
    this.id = result.id;
    this.selected = undefined;
  }

  @action clear() {
    this.data = [];
    this.selected  = undefined;
  }

  @action swapRows() {
    this.data = swapRows(this.data);
  }

  @action remove({id}) {
    this.data = deleteRow(this.data, id);
    this.selected = undefined;
  }

  @action select({id}) {
    this.selected = id;
  }

  @action remove2(id) {
    this.data = deleteRow(this.data, id);
    this.selected = undefined;
  }

  @action select2(id) {
    this.selected = id;
  }
}
