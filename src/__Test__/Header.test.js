import Enzyme, { shallow, mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../Components/Header/header'

Enzyme.configure({ adapter: new EnzymeAdapter })
it("renders Header component without crashing ", () => {
    // const mountWrapper = mount(<Header/>)
    // console.log("wrapper", mountWrapper.debug());
    const shallowWrapper = shallow(<Header/>)
    console.log("wrapper", shallowWrapper.debug());


})
it("render maindiv in component without crashing",()=>{
    const shallowWrapper = shallow(<Header/>)
    const maindiv=shallowWrapper.find(`[className="grow"]`);
    expect(maindiv.length).toBe(1)

})
// it("render email textfield in component without crashing",()=>{
//     const shallowWrapper = shallow(<Header/>)
//     const maindiv=shallowWrapper.find(`[className="input"]`);
//     expect(maindiv.length).toBe(2)

// })
it("render menu button textfield in component without crashing",()=>{
    const shallowWrapper = shallow(<Header/>)
    const maindiv=shallowWrapper.find(`[className="AppBar"]`);
    expect(maindiv.length).toBe(1)

})