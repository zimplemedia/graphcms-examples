import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID,
 process.env.ALGOLIA_SEARCH_ONLY_API_KEY
);

export default function IndexPage() {
  return (
    <InstantSearch searchClient={searchClient} indexName="products">
      <SearchBox />
      <Hits
        hitComponent={({ hit }) => (
          <pre key={hit.objectID}>{JSON.stringify(hit, null, 2)}</pre>
        )}
      />
    </InstantSearch>
  );
}
