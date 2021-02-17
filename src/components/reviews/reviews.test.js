import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Reviews from './';

import { restaurants } from '../../fixtures';
import Product from "../product/product";

const reviews = restaurants[1].reviews;

Enzyme.configure({ adapter: new Adapter() });

describe("Reviews", ()=> {
  let wrapper
  beforeEach(()=>{
    wrapper = mount(<Reviews reviews={reviews} />);
  })
  it("should be rendered",()=>{
    expect(wrapper.find('[data-id="reviews"]').length).toBe(1)
  })
  it("should render correctly zero length review",()=>{
    const zeroData = []
    wrapper = mount(<Reviews reviews={zeroData} />);
    expect(wrapper.find('[data-id="review"]').length).toBe(0)
  })
  it("children length should be equal to reviews length",()=>{
    expect(wrapper.find('[data-id="review"]').length).toBe(reviews.length)
  })
})
