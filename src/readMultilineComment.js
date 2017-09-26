if (this.input.charCodeAt(this.currentIndex) === 47 && this.input.charCodeAt(this.currentIndex + 1) === 42) {
  // TODO check vvv
  let end = this.input.indexOf('*/', this.currentIndex),
      search = this.currentIndex;
  while ((search = this.input.indexOf('\n', search + 1)) !== -1 && search < end) {
    this.line++;
  }
  // TODO check ^^^
  comment = this.input.slice(this.currentIndex, end + 2);
} else {
  comment = null;
}
