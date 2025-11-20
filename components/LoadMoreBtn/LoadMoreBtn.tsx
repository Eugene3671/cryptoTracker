
interface loadMoreBtnProp{
handleClick: ()=>void;
}

export default function LoadMoreBtn({handleClick}:loadMoreBtnProp){
    return(
        <button onClick={handleClick} 
        className="block mx-auto mt-5 px-8 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 shadow-lg hover:translate-y-[-2px] hover:shadow-xl transition-transform duration-300"
        >Load More</button>
    )
}