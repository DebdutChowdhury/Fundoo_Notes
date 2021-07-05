import Enzyme, { shallow, mount, ShallowWrapper } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import React from 'react';
import renderer from 'react-test-renderer';
import Appbar from '../Component/Appbar/Appbar';

Enzyme.configure({adapter : new EnzymeAdapter})
it("renderer Appbar component without crashing", ()=>{
    const shalloWraper = shallow(<Appbar/>)
    console.log("wraper", shalloWraper.debug());
})

it("renderer main div in componet without crahing",()=>{
    const shallowWrapper = shallow(<Appbar/>)
    const maindiv=shallowWrapper.find(`[className="root"]`)
    expect(maindiv.length).toBe(1)
})

