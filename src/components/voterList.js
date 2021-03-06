import React, { Component } from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"

import { media } from "../styles"

class ListCard extends Component {
  state = {
    voter: this.props.voter,
    hidden: true,
  }
  render() {
    return (
      <div
        css={{
          width: "100%",
          minHeight: 500,
          borderRadius: 10,
          overflow: "hidden",

          [media(767)]: {
            width: "calc(50% - 2rem)",
            ":nth-child(odd)": {
              marginRight: "2rem",
            },
          },
        }}
      >
        <h2
          css={css`
            padding: 1rem 3rem;
            font-size: 2.5rem;
          `}
        >{`${this.props.choice} (${this.state.voter.length})`}</h2>
        {this.state.voter.length > 0 ? (
          <ul
            css={css`
              min-height: 518px;
              position: relative;
              margin-bottom: 10rem;
            `}
          >
            {this.state.voter
              .sort((a, b) => a.name.localeCompare(b.name, "th"))
              .map((member, idx) => (
                <li
                  key={member.fields.slug}
                  css={css`
                    font-size: 2rem;
                    display: ${this.state.hidden && idx > 7 ? "none" : "block"};
                    margin: 2rem 2rem;
                  `}
                >
                  <Link
                    to={member.fields.slug}
                    css={css`
                      font-weight: bold;
                      color: var(--cl-black);
                    `}
                  >
                    {member.name} {member.lastname}
                  </Link>

                  <p>{member.is_senator ? "สมาชิกวุฒิสภา" : member.party}</p>
                </li>
              ))}
            {this.state.hidden && this.props.voter.length > 8 ? (
              <button
                css={css`
                  display: flex;
                  padding: 0;
                  border: none;
                  background: none;
                  width: 100%;
                  padding-top: 20rem;
                  background: transparent
                    linear-gradient(
                      to bottom,
                      rgba(0, 0, 0, 0),
                      rgba(0, 0, 0, 0.5)
                    );
                  border-radius: 10px;
                  position: absolute;
                  bottom: -2rem;
                  pointer-events: none;
                  &:focus {
                    outline: none;
                  }
                `}
              >
                <span
                  onClick={() => this.setState({ hidden: !this.state.hidden })}
                  css={css`
                    font-family: var(--ff-title);
                    font-size: 2.4rem;
                    line-height: 3rem;
                    cursor: pointer;
                    border: 0.2rem solid black;
                    border-radius: 5px;
                    padding: 1rem 6rem;
                    display: block;
                    margin: 2rem auto;
                    background-color: white;
                    pointer-events: auto;
                  `}
                >
                  ดูทั้งหมด
                </span>
              </button>
            ) : (
              ""
            )}
          </ul>
        ) : (
          <div
            css={{
              fontSize: "2rem",
              margin: "6rem 0",
              textAlign: "center",
            }}
          >
            ไม่มีคะแนนเลือกมติประเภทนี้
          </div>
        )}
      </div>
    )
  }
}

export default ({ data }) => {
  return (
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;
      `}
    >
      <ListCard voter={data[0]} choice="เห็นด้วย" />
      <ListCard voter={data[1]} choice="ไม่เห็นด้วย" />
      <ListCard voter={data[2]} choice="งดออกเสียง" />
      <ListCard voter={data[3]} choice="ไม่ลงคะแนน" />
    </div>
  )
}
