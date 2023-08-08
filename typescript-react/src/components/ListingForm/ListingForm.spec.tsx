import { render } from '@testing-library/react';

import ListingForm, { Listing } from '.';

describe('<ListingForm />', () => {
  it('Should render the listing form component', () => {
    render(<ListingForm listing={null} refresh={false} setRefresh={function (value: boolean): void {
      throw new Error('Function not implemented.');
    } } setEditingListing={function (listing: Listing | null): void {
      throw new Error('Function not implemented.');
    } } />);
  });
});
