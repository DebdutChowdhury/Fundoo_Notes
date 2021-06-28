import Enzyme, { shallow, mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import React from 'react';
import renderer from 'react-test-renderer';
import Dashboard from '../Pages/Dashboard/Dashboard'

Enzyme.configure({ adapter: new EnzymeAdapter })

it("renders Login component without crashing ", () => {
    const wrapper = shallow(<Dashboard/>)
    console.log("wrapper", wrapper.debug());

})

it("render maindiv in component without crashing",()=>{
    const shallowwrapper = shallow(<Dashboard/>);
    const maindiv=shallowwrapper.find(`[className="root"]`);
    expect(maindiv.length).toBe(1)

})