import React from 'react'

const Header = ({ course }) => {
    return (
        <div>
            <h1>{course}</h1>
        </div>
    )
}

const Content = ({ parts }) => {


    const total = parts.reduce(
        (accumulator, currentValue) => accumulator + currentValue.exercises, 0
    )

    return (
        <div>
            {parts.map(part => (
                <div key={part.id}>
                <Part part={part} />
                </div>
            ))}

            <Total total={total} />
        </div>

    )
}

const Part = ({ part }) => {

    return (

        <p key={part.id}>{part.name} {part.exercises}</p>
    )
}

const Total = ({ total }) => {

    return (
        <div>
            <p><b>total of {total} exercises</b></p>
        </div>
    )
}

const Course = ({ courses }) => {

    return (
        <div>
            <h1>Web development curriculum</h1>
            {courses.map(course => (
                
                <div key={course.id}>
                    <Header course={course.name} />
                    <Content parts={course.parts} />
                </div>
            ))}
        </div>
    )
}

export default Course