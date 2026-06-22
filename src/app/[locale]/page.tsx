import { fetchCharacters } from '../../api/ramapi-server';
import { MainPage } from '../../screens/main-page/main-page';
import { getValidDetailsId, getValidPage } from '../../utils/url-params.utils';

interface Props {
  searchParams: Promise<{
    search?: string;
    page?: string;
    details?: string;
  }>;
}

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const searchValue = (params.search ?? '').trim();
  const currentPage = getValidPage(params.page ?? null);
  const selectedCharacterId = getValidDetailsId(params.details ?? null);

  const data = await fetchCharacters({
    name: searchValue,
    page: currentPage,
  });

  return (
    <MainPage
      characters={data.results}
      totalPages={data.info.pages}
      currentPage={currentPage}
      searchValue={searchValue}
      selectedCharacterId={selectedCharacterId}
    />
  );
}
