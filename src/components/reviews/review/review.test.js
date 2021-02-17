import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Review from './';

import { restaurants } from '../../../fixtures';

const review = restaurants[1].reviews[0];

Enzyme.configure({ adapter: new Adapter() });

describe("Review", ()=> {
  let wrapper
  beforeEach(() => {
    wrapper = mount(<Review {...review}/>);
  })

  it("should be rendered", () => {
    expect(wrapper.find('[data-id="review"]').length).toBe(1)
  })

  it('should has user string',  () => {
    expect(wrapper.find('[data-id="review-user"]').text()).toBe(review.user)
  });

  it('should user has default value',  () => {
    expect(Review.defaultProps.user).not.toBeUndefined()
  });

  it('should render correctly user default value',  () => {
    wrapper = mount(<Review {...{text: '', rating: 1}}/>);
    expect(wrapper.find('[data-id="review-user"]').text()).toBe(Review.defaultProps.user)
  });

  it('should has text string',  () => {
    expect(wrapper.find('[data-id="review-text"]').text()).toBe(review.text)
  });

  it('should render rating element',  () => {
    expect(wrapper.find('[data-id="rate"]').length).toBe(1)
  });
})
