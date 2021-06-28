import Enzyme, { shallow, mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import React from 'react';
import renderer from 'react-test-renderer';
import Registration from '../Components/Resgistration/register'

Enzyme.configure({ adapter: new EnzymeAdapter })

it("renders Login component without crashing ", () => {
    // const mountWrapper = mount(<Login/>)
    // console.log("wrapper", mountWrapper.debug());
    const shallowWrapper = shallow(<Registration/>)
    console.log("wrapper", shallowWrapper.debug());


})
it("render maindiv in component without crashing",()=>{
    const shallowWrapper = shallow(<Registration/>)
    const maindiv=shallowWrapper.find(`[className="register"]`);
    expect(maindiv.length).toBe(1)

})
it("render  textfield in component without crashing",()=>{
    const shallowWrapper = shallow(<Registration/>)
    const maindiv=shallowWrapper.find(`[className="input-name"]`);
    expect(maindiv.length).toBe(2)

})
it("render button in component without crashing",()=>{
    const shallowWrapper = shallow(<Registration/>)
    const maindiv=shallowWrapper.find(`[className="next"]`);
    expect(maindiv.length).toBe(1)

})