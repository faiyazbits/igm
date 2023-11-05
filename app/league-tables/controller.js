// app/controllers/league-table/edit.js

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class LeagueTableEditController extends Controller {
  @service store;

  @action
  async saveLeagueTable() {
    try {
      const leagueTable = this.model;
      await leagueTable.save();
      this.transitionToRoute('league-table.show', leagueTable.id);
    } catch (error) {
      console.error('Error saving league table:', error);
      // Handle error as needed
    }
  }

  @action
  async cancelEditing() {
    const leagueTable = this.model;
    leagueTable.rollbackAttributes();
    this.transitionToRoute('league-table.show', leagueTable.id);
  }
}
