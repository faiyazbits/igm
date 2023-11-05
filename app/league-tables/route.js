// app/routes/league-table/edit.js

import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class LeagueTableEditRoute extends Route {
  model(params) {
    // Fetch and return the specific league table using the league_table_id parameter
    return this.store.findRecord('league-table', params.league_table_id);
 
  }
}
