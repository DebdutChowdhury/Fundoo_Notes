import Enzyme, { shallow, mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import React from 'react';
import renderer from 'react-test-renderer';
import TakeNote from '../Components/Take a note/takeanote';

Enzyme.configure({ adapter: new EnzymeAdapter })
it("renders TakeNote component without crashing ", () => {
    // const mountWrapper = mount(<TakeNote/>)
    // console.log("wrapper", mountWrapper.debug());
    const shallowWrapper = shallow(<TakeNote/>)
    console.log("wrapper", shallowWrapper.debug());


})
it("render maindiv in component without crashing",()=>{
    const shallowWrapper = shallow(<TakeNote/>)
    const maindiv=shallowWrapper.find(`[className="body"]`);
    expect(maindiv.length).toBe(1)

})
it("render email textfield in component without crashing",()=>{
    const shallowWrapper = shallow(<TakeNote/>)
    const maindiv=shallowWrapper.find(`[className="input"]`);
    expect(maindiv.length).toBe(2)

})
it("render button textfield in component without crashing",()=>{
    const shallowWrapper = shallow(<TakeNote/>)
    const maindiv=shallowWrapper.find(`[className="login"]`);
    expect(maindiv.length).toBe(1)

})
// it('renders correctly', () => {
//     const tree = renderer.create(
//         <Login/>
//     ).toJSON();
//     expect(tree).toMatchSnapshot();
// });