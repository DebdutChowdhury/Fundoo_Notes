import Enzyme, { shallow, mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import React from 'react';
import renderer from 'react-test-renderer';
import DisplayNote from '../Components/DisplayNote/displayN'
Enzyme.configure({ adapter: new EnzymeAdapter })
it("renders DisplayNote component without crashing ", () => {
    // const mountWrapper = mount(<DisplayNote/>)
    // console.log("wrapper", mountWrapper.debug());
    const shallowWrapper = shallow(<DisplayNote/>)
    console.log("wrapper", shallowWrapper.debug());


})
it("render maindiv in component without crashing",()=>{
    const shallowWrapper = shallow(<DisplayNote/>)
    const maindiv=shallowWrapper.find(`[className="noteDisplay"]`);
    expect(maindiv.length).toBe(1)

})
it("render email textfield in component without crashing",()=>{
    const shallowWrapper = shallow(<DisplayNote/>)
    const maindiv=shallowWrapper.find(`[className="inputbas"]`);
    expect(maindiv.length).toBe(2)

})
it("render button textfield in component without crashing",()=>{
    const shallowWrapper = shallow(<DisplayNote/>)
    const maindiv=shallowWrapper.find(`[className="enclose"]`);
    expect(maindiv.length).toBe(1)

})