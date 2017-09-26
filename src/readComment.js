if (this.input.charCodeAt(this.currentIndex) ===  47 && this.input.charCodeAt(this.currentIndex + 1) === 47) {
  comment = this.input.slice(this.currentIndex, this.input.indexOf('\n', this.currentIndex)); // TODO
} else {
  comment = null;
}
