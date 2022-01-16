export const highlightQuery = (abstract: string, query: string) => {
  return query.trim() !== ''
    ? abstract.replaceAll(
        new RegExp(
          '(['.concat(
            query
              .split(' ')
              .map(q => '('.concat(q).concat(')'))
              .join()
              .concat('])'),
          ),
          'gi',
        ),
        '<span class="text-orange-400">'.concat('$1').concat('</span>'),
      )
    : abstract
}
