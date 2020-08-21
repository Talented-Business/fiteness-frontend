import React,{useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { $fetchFrontIndex,$frontPage } from "../../../../modules/subscription/company";
import useInfiniteScroll from "../../../../lib//useInfiniteScroll";
import Company from "./Company";


const Shop = () => {
  const dispatch = useDispatch();
  const company = useSelector(({ company }) => company);
  const companies = company.frontData;
  const meta = company.frontMeta;
  useEffect(() => {
    setIsFetching(false);
  }, [company.frontMeta]);
  const fetchMoreListItems = ()=>{
    dispatch($frontPage());
  }
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
  return (
    <section className="shop" id="shop">
      <div className="row">
        {companies&&companies.map((company)=>
          <article className="col-12 col-md-4"  key={company.id}>
            <div className="content">
              <NavLink
                aria-label="Company"
                title={`Read ${company.name}`}
                to={`/shop/companies/${company.id}`}
              >
                <div className="image">
                  <div className="background-container">
                    <div className="background" 
                      style={{
                        backgroundImage: "url(" + company.logo + ")"
                      }}
                    >
                    </div>
                  </div>
                </div>
                <div className="body">
                  <div className="name">
                    {company.name}
                  </div>
                </div>
              </NavLink> 
            </div>
          </article>
        )}
        {meta&&meta.page<meta.pageTotal&&isFetching && 'Obteniendo más elementos de la lista...'}
      </div>
    </section>
  );
};

export default Shop;
