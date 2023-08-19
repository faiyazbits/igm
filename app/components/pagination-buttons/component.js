import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class PaginationButtonsComponent extends Component {
  get currentPage() {
    return this.args.currentPage || 1;
  }

  get totalPages() {
    return this.args.totalPages || 1;
  }

  get nextPageNumber() {
    return this.currentPage + 1;
  }

  get previousPageNumber() {
    return this.currentPage - 1;
  }

  get hasNextPage() {
    return this.currentPage < this.totalPages;
  }

  get hasPreviousPage() {
    return this.currentPage >= 2;
  }
}
